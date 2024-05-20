import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { app } from '../../firebaseconfig';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

interface FormValues {
  ImagemProdutos: string;
  NcmProduto: string;
  UserCPF: string;
  UserEmail: string;
  UserFullName: string;
  UserPrincipalAtividade: string;
  UserRG: string;
  NomeProduto: string;

}

export default function AgencyForm() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (values: FormValues) => {
    setLoading(true);
    const resp = await fetch(image!);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'produtosCheck/' + Date.now() + ".jpg");

    uploadBytes(storageRef, blob).then(() => {
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        values.ImagemProdutos = downloadUrl;
        values.UserFullName = user?.fullName || '';
        values.UserEmail = user?.primaryEmailAddress.emailAddress || '';

        const docRef = await addDoc(collection(db, "AgencyForm"), values);
        if (docRef.id) {
          setLoading(false);
          Alert.alert('Informações enviadas com sucesso. Aguarde sua aprovação!');
        }
      });
    });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 10, marginTop: -4 }}>
        <Text style={{ fontWeight: "bold", marginTop: 0, fontSize: 27, color: "#817A7A" }}>Comece a exportar</Text>
        <Text style={{ color: "#817A7A", fontSize: 18, marginTop: 5, marginBottom: 5 }}>Preencha os campos para receber suporte e ser aprovado</Text>
        <Formik
          initialValues={{ ImagemProdutos: '', NcmProduto: '', UserCPF: '', UserEmail: '', UserFullName: '', UserPrincipalAtividade: '', UserRG: '', NomeProduto: '' }}
          onSubmit={(values) => onSubmitMethod(values)}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            // Aqui você pode adicionar validações conforme necessário
            return errors;
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                ) : (
                  <Image source={require('./../../assets/images/placeholder.jpg')} style={{ width: 100, height: 100, borderRadius: 15 }} />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder='Nome do produto(s)'
                value={values.NomeProduto}
                onChangeText={handleChange('NomeProduto')}
              />
         
            
              {/* Adicionando campos correspondentes à coleção AgencyForm */}
              <TextInput
                style={styles.input}
                placeholder='NCM'
                value={values.NcmProduto}
                onChangeText={handleChange('NcmProduto')}
              />
              <TextInput
                style={styles.input}
                placeholder='CPF'
                value={values.UserCPF}
                onChangeText={handleChange('UserCPF')}
                keyboardType='number-pad'
              />
              <TextInput
                style={styles.input}
                placeholder='RG'
                value={values.UserRG}
                onChangeText={handleChange('UserRG')}
              />
              <TextInput
                style={styles.input}
                placeholder='Principal atividade'
                value={values.UserPrincipalAtividade}
                onChangeText={handleChange('UserPrincipalAtividade')}
              />

              <TouchableOpacity
              //@ts-ignore
                onPress={handleSubmit}
                style={{
                  backgroundColor: loading ? '#ccc' : '#F59A00',
                  padding: 10,
                  borderRadius: 100,
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color='#fff' />
                ) : (
                  <Text style={{ color: 'white', fontSize: 16 }}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 17,
    textAlignVertical: 'top',
    fontSize: 17,
  }
});
