import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseconfig';
import { Picker } from '@react-native-picker/picker';
import { Home } from './Home';
import { AppRoutes } from '../routes/app.routes';

export function UserTypeSelection() {
    const db = getFirestore(app);
    const { user } = useUser();
    const [tipoUsuario, setTipoUsuario] = useState('artesao');
    const [pais, setPais] = useState('brasil');
    const [saving, setSaving] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const saveUserSelection = async () => {
        try {
            setSaving(true);
            const userInfoRef = collection(db, 'userInfo');
            await addDoc(userInfoRef, {
                nomeUser: user.fullName,
                emailUser: user.primaryEmailAddress.emailAddress,
                local: pais,
                tipo: tipoUsuario,
                Liberado: false // Defina o valor inicial para Liberado
            });
            console.log('Seleção do usuário salva com sucesso!');
            setSaving(false);
            setRedirectToHome(true); // Mudar o estado para redirecionar para a Home

        } catch (error) {
            console.error('Erro ao salvar seleção do usuário:', error);
            setSaving(false);
        }
    };

    // Redirecionar para a Home se o estado for true
    if (redirectToHome) {
        return <AppRoutes/>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Precisamos de mais algumas informações</Text>
            <Text style={styles.text}>Que tipo de usuario você é?</Text>
            <Picker
                style={styles.picker}
                selectedValue={tipoUsuario}
                onValueChange={(itemValue, itemIndex) => setTipoUsuario(itemValue)}>
                <Picker.Item label="Artesão" value="artesao" />
                <Picker.Item label="Comprador" value="comprador" />
                <Picker.Item label="Agência" value="agencia" />
            </Picker>
            <Text style={styles.text}>Onde você mora?</Text>
            <Picker
                style={styles.picker}
                selectedValue={pais}
                onValueChange={(itemValue, itemIndex) => setPais(itemValue)}>
                <Picker.Item label="Brasil" value="brasil" />
                <Picker.Item label="Paraguai" value="paraguai" />
            </Picker>
            <TouchableOpacity onPress={saveUserSelection} disabled={saving}>
                <Text style={[styles.button, saving && { opacity: 0.5 }]}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 27,
        color: "#817A7A",
        marginBottom: 20,
    },
    text: {
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 21,
        color: "#817A7A",
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 5,
        borderColor: "black",
    },
    button: {
        fontSize: 16,
        marginTop: 50,
        color: "white",
        textAlign: 'center',
        backgroundColor: '#FFA500',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 50,
    },
});

export default UserTypeSelection;
