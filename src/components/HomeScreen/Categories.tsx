import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({ categoryList }) {

  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 2 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Categorias</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
          // @ts-ignore
          onPress={() => navigation.navigate('item-list', {
            category: item.name
          })}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 1,
              borderWidth: 0,
              margin: 2,
              height: 70,
              width: 50,
              borderRadius: 20,
              backgroundColor: 'white',
            }}
          >
            <Image source={{ uri: item.icon }} style={{ width: 35, height: 35 }}/>
            <Text style={{ fontSize: 12, marginTop: 1, fontWeight: 'bold' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
