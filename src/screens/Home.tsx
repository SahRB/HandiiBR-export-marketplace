import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Slider";
import { collection, doc, getDocs, getFirestore, query, orderBy } from "firebase/firestore";
import { app } from "../../firebaseconfig";
import Categories from "../components/HomeScreen/Categories";
import LatestItemList from "../components/HomeScreen/LatestItemList";

export function Home() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc')); // Crie a consulta usando a função query e orderBy
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log("Docs", doc.data())
      setLatestItemList(latestItemList => [...latestItemList, doc.data()]);
    });
  };

  return (
     <View style={{ padding: 20}}>
           <Header />
      <ScrollView >
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} heading="Ultimos Items"  
      />
   </ScrollView>
     </View>
 
  );
}
