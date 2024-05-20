import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseconfig';
import LatestItemList from '../components/HomeScreen/LatestItemList';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductList(products);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20 }}>Continue Explorando</Text>
        <LatestItemList latestItemList={productList} heading={undefined} />
      </View>
    </ScrollView>
  );
}
