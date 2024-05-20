import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseconfig';
import LatestItemList from '../components/HomeScreen/LatestItemList';
export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (params && params.category) {
      getItemListByCategory();
    }
  }, [params]);

  const getItemListByCategory = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
      const snapshot = await getDocs(q);
      const items = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      setItemList(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 8 }}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} size="large" color="#3b82f6" />
      ) : itemList.length > 0 ? (
        <LatestItemList latestItemList={itemList} heading="" />
      ) : (
        <Text style={{ padding: 20, fontSize: 20, marginTop: 24, textAlign: 'center', color: '#888888' }}>Nenhum artesanato</Text>
      )}
    </View>
  );
}
