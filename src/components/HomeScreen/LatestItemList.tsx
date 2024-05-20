import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PostItem from './PostItem';

export default function LatestItemList({ latestItemList, heading }) {
  return (
    <View style={{ marginTop: 3, paddingBottom:100}}>
      
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{heading}</Text>
      <View style={styles.container}>
        {latestItemList.map((item, index) => (
         <PostItem item={item} />
        ))}
      </View>
    </View>
  );
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
