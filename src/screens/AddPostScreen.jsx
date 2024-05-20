import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseconfig';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getFirestore,getDocs ,collection, addDoc, } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { useUser } from '@clerk/clerk-expo';
import Aguardando from '../components/AgencyScreen/Aguardando';
export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading,setLoading]=useState(false);
  const {user}=useUser();
  const [categoryList,setCategoryList]=useState([]);
  useEffect(()=>{
    getCategoryList();
  },[])

  /**
   * Used to get Category List
   */
  const getCategoryList=async()=>{ 
    setCategoryList([]);
    const querySnapshot=await getDocs(collection(db,'Category'));
    querySnapshot.forEach((doc)=>{
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const onSubmitMethod=async(value)=>{
    
    setLoading(true)
    //Covert Uri to Blob File
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg");

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName;
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.userImage=user.imageUrl;
        const docRef=await addDoc(collection(db,"UserPost"),value)
        if(docRef.id)
        {
          setLoading(false);
          Alert.alert('Successo!!!','Post adicionado.')
        }
      })
    });


  }
  return (
//     <KeyboardAvoidingView>
//     <ScrollView style={{padding:10, marginTop: -4}}> 
//     <Text style= {{fontWeight: "bold", marginTop: 0, fontSize: 27, color: "#817A7A"}}>Novo Produto</Text>
//     <Text style={{color: "#817A7A", fontSize: 18, marginTop: 5, marginBottom: 5}}>Insira o produto e comece a vender</Text>
//         <Formik
//           initialValues={{title:'',desc:'',address:'',price:'',image:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}
//           onSubmit={value=>onSubmitMethod(value)}
//           validate={(values)=>{
//             const errors={}
//             if(!values.title)
//             {
//               console.log("O titulo não está presente");
//               ToastAndroid.show('O título não está presente',ToastAndroid.SHORT)
//               errors.name="Title Must be there"
//             }
//             return errors
//           }}
//         >
//           {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
//             <View>

//               <TouchableOpacity onPress={pickImage}>
//             {image?
//             <Image source={{uri:image}} style={{width:100,height:100,borderRadius:15}} />
//             :
//             <Image source={require('./../../assets/images/placeholder.jpg')}
//             style={{width:100,height:100,borderRadius:15}}
//             />}
             
//                 </TouchableOpacity>
//                 <TextInput
//                   style={styles.input}
//                   placeholder='Titulo'
//                   value={values?.title}
//                   onChangeText={handleChange('title')}
//                 />
//                  <TextInput
//                   style={styles.input}
//                   placeholder='Descrição'
//                   value={values?.desc}
      
//                   numberOfLines={5}
//                   onChangeText={handleChange('desc')}
//                 />
//                  <TextInput
//                   style={styles.input}
//                   placeholder='Preço'
//                   value={values?.price}
//                   keyboardType='number-pad'
//                   onChangeText={handleChange('price')}
//                 />
//                  <TextInput
//                   style={styles.input}
//                   placeholder='Endereço'
//                   value={values?.addresss}
//                   onChangeText={handleChange('address')}
//                 />

//                 {/* Category List Dropdown  */}
//                 <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>
//             <Picker
//               selectedValue={values?.category}
//               onValueChange={itemValue=>setFieldValue('category',itemValue)}
//             > 
//               {categoryList.length>0&&categoryList?.map((item,index)=>(
//                   <Picker.Item key={index} 
//                    label={item?.name} value={item?.name} />
//               ))}
          
//             </Picker>
//             </View>
//             <TouchableOpacity 
//   onPress={handleSubmit} 
//   style={{
//     backgroundColor: loading ? '#ccc' : '#F59A00',
//     padding: 10,
//     borderRadius: 100,
//     marginTop: 10,
//     alignItems: 'center', // Para centralizar horizontalmente
//     justifyContent: 'center', // Para centralizar verticalmente
//   }}
//   disabled={loading}
// >
//   {loading ? (
//     <ActivityIndicator color='#fff' />
//   ) : ( 
//     <Text style={{ color: 'white', fontSize: 16 }}>Postar</Text>
//   )}
// </TouchableOpacity>
//             </View>
          
//           )}
//         </Formik>
//     </ScrollView>
//     </KeyboardAvoidingView>
<Aguardando/>
 
  )
}

// const styles = StyleSheet.create({
//     input:{
//         borderWidth:1,
//         borderRadius:10,
//         padding:10,
//         paddingTop:15,
       
//         marginTop:10,marginBottom:5,
//         paddingHorizontal:17,
//         textAlignVertical:'top',
//         fontSize:17
//     }
// })