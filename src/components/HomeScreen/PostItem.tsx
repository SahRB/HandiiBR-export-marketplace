import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function PostItem({item}) {
  const navigation = useNavigation();
  return (
    //@ts-ignore
    <TouchableOpacity  style={styles.itemContainer} onPress={() => navigation.navigate('product-detail', { product: item })}
    >
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>R$ {item.price}</Text>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    itemContainer: {
      width: '48%', // Adjust as needed to fit two items in a row
      marginBottom: 10,
    },
    image: {
      height: 130,
      width: '100%',
      marginBottom: 5,
      borderRadius: 10,
    },
    textContainer: {
      paddingHorizontal: 5,
    },
    title: {
      fontSize: 15,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#D14113',
    },
  });