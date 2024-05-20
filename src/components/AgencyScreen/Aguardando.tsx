import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Aguardando() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/loading.png')} style={styles.image} />
      <Text style={styles.text}>Aguarde, sua aprovação está sendo verificada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      width: '100%',
 height: 600,
        resizeMode: 'cover',
        borderWidth: 4,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
  },
  text: {
    fontSize: 21,
    color: 'darkgrey', // Cor do texto
    textAlign: 'center',
    marginTop: 10,
  },
});
