import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export function Login() {
    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
    const onPress = async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
   
            if (createdSessionId && setActive) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    };

    console.log("Renderizando Login"); // Adicione este log de depuração

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/a.png')} 
                style={styles.image} 
            />
            <View>
                
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Artesanato brasileiro</Text>
                <Text style={styles.description}>A verdadeira arte brasileira, vinda diretamente dos artesãos nativos, explora uma cultura.</Text>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={styles.buttonText}>Comece Agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CB3505',
      
    },
    image: {
        width: '100%',
        height: height * 0.6,
        resizeMode: 'cover',
        borderWidth: 4,
        backgroundColor:"white",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
       
    },
    contentContainer: {
        borderTopLeftRadius: 20,  // Adicione esta linha para borda arredondada no topo à esquerda
        borderTopRightRadius: 20,
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        borderRadius: 999,
    },
    buttonText: {
        fontSize: 18,
        color: '#2E6612',
        textAlign: 'center',
        fontWeight: "bold"
    },
});
