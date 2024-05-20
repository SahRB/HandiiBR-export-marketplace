import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseconfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    user && getUserPost();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserPost();
    });
    return unsubscribe;
  }, [navigation]);

  const getUserPost = async () => {
    setProductList([]);
    const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      setProductList(productList => [...productList, doc.data()]);
    });
  };

  return (
    <View>
      <LatestItemList latestItemList={productList} heading={undefined} />
    </View>
  );
}
