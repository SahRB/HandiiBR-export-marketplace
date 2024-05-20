import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';

export default function Header() {
    const {user}=useUser();
  return (
    <View style={{marginBottom:1}}>
    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Image source={{ uri: user?.imageUrl }} style={{ height: 40, width: 40, borderRadius: 100 }}></Image>
          <View>
        
      <Text style={{fontSize:18,  fontWeight: 'bold'}}> Olá </Text>
          <Text style={{fontSize:15}}>{user?.fullName}</Text>
       
        </View>
      </View>
      <View style={{ padding: 5,flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 50, marginTop: 15 }}>
      <Feather name="search" size={18} color="black" style={{ marginRight: 10 }} />
      <TextInput placeholder='Pesquisar' style={{ flex: 1 }} />
    </View>
      </View>
  )
}