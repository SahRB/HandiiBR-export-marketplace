import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View >
     <FlatList data={sliderList} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index})=>(
        <View>
       
            <Image source={{uri:item?.image}} style={{height:200,  marginRight: 10,  borderRadius: 10, width: 300 }}   resizeMode="contain"/>
            </View>
     )}/>
    </View>
  )
}