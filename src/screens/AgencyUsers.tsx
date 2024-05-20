import { View, Text } from 'react-native'
import React from 'react'
import Card from '../components/AgencyScreen/Card'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import HeaderAgency from '../components/AgencyScreen/headerAgency'

export default function AgencyUsers() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeaderAgency/>
       <ScrollView>
       <Card/>
    </ScrollView>
 </GestureHandlerRootView>
   
      
    
  )
}