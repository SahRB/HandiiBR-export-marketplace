import { View, Text, Image, ScrollView, Linking, Share, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseconfig';

interface Product {
  title: string;
  desc: string;
  category: string;
  userEmail: string;
  userImage: string;
  userName: string;
  image: string;
}

export default function ProductDetail() {
  const { params } = useRoute();
  const [product, setProduct] = useState<Product | null>(null);
  const { user } = useUser();
  const db = getFirestore(app);
  const nav = useNavigation();

  useEffect(() => {
    if (params && 'product' in params) {
        //@ts-ignore
      setProduct(params.product);
      shareButton();
    }
  }, [params]);

  const shareButton = () => {
    nav.setOptions({
      headerRight: () => (
        <Ionicons
          name="share-social-sharp"
          size={24}
          onPress={shareProduct}
          color="white"
          style={{ marginRight: 15 }}
        />
      ),
    });
  };

  const shareProduct = async () => {
    if (product) {
      const content = {
        message: `${product.title}\n${product.desc}`,
      };
      Share.share(content).then(resp => {
        console.log(resp);
      }, error => {
        console.log(error);
      });
    }
  };

  const sendEmailMessage = () => {
    if (product) {
      const subject = `Regarding ${product.title}`;
      const body = `Ola ${product.userName}\nEstou interessado neste produto`;
      Linking.openURL(`mailto:${product.userEmail}?subject=${subject}&body=${body}`);
    }
  };

  const deleteUserPost = () => {
    Alert.alert('Tem certeza que quer deletar', "Quer deletar este Post?", [
      {
        text: 'Yes',
        onPress: deleteFromFirestore
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  const deleteFromFirestore = async () => {
    if (product) {
      const q = query(collection(db, 'UserPost'), where('title', '==', product.title));
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        deleteDoc(doc.ref).then(resp => {
          console.log("Deleted the Doc...");
          nav.goBack();
        });
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {product && (
        <>
          <Image
            source={{ uri: product.image }}
            style={{ height: 320, width: '100%' }}
          />
          <View style={{ margin: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#025600' }}>{product.title}</Text>
            <View style={{ alignItems: 'baseline' }}>
              <Text style={{ backgroundColor: '#D40564', padding: 5, marginTop: 2, paddingHorizontal: 8, borderRadius: 999, color: 'white' }}>{product.category}</Text>
            </View>
            <Text style={{ marginTop: 3, fontWeight: 'bold', fontSize: 20 }}>Descrição</Text>
            <Text style={{ fontSize: 17, color: '#888888' }}>{product.desc}</Text>
          </View>
          {/* User Info */}
          <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderColor: 'gray-400' }}>
            <Image
              source={{ uri: product.userImage }}
              style={{ width: 40, height: 40, borderRadius: 30 }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>{product.userName}</Text>
              <Text style={{ color: '#888888' }}>{product.userEmail}</Text>
            </View>
          </View>
          {user?.primaryEmailAddress.emailAddress === product.userEmail ? (
            <TouchableOpacity
              onPress={deleteUserPost}
              style={{ zIndex: 40, backgroundColor: '#D40564', borderRadius: 999, padding: 4, margin: 2 }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Deletar Post</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={sendEmailMessage}
              style={{ zIndex: 40, backgroundColor: '#D14113', borderRadius: 999, padding: 20, margin: 2 }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Enviar mensagem</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
}
