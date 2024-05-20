import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseconfig';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Card = () => {
  const db = getFirestore(app);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'AgencyForm'));
        const fetchedData = querySnapshot.docs.map(doc => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchData();
  }, [db]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          {item.ImagemProdutos ? (
            <Image source={{ uri: item.ImagemProdutos }} style={styles.image} />
          ) : null}
          <View style={styles.content}>
            <Text style={styles.title}> {item.UserFullName}</Text>
            <Text style={styles.description}>NCM: {item.NcmProduto}</Text>
            <Text style={styles.description}>CPF: {item.UserCPF}</Text>
            <Text style={styles.description}>Email: {item.UserEmail}</Text>
            <Text style={styles.description}>Nome do produto:{item.NomeProduto}</Text>
            <Text style={styles.description}>Atividade Principal: {item.UserPrincipalAtividade}</Text>
            <Text style={styles.description}>RG: {item.UserRG}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#2BC016" }]}>
                <Feather name="check" size={20} color="white" />
                <Text style={{ color: 'white' }}>Aprovar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#df564e" }]}>
                <Feather name="x" size={20} color="white" />
                <Text style={{ color: 'white' }}>Reprovar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#0496FF" }]}>
                <Feather name="calendar" size={20} color="white" /> 
                <Text style={{ color: 'white' }}>Agendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 10,
    width: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 10,
  },
  button: {
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 8,
    gap: 10,
    borderRadius: 5,
  },
});

export default Card;

