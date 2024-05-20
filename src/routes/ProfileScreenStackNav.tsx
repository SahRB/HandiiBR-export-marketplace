import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/ProfileScreen';
import MyProducts from '../screens/MyProducts';
import ProductDetail from '../screens/ProductDetail';

const Stack=createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='profile-tab' 
        options={{
            headerShown:false
        }}
        component={ProfileScreen} />
         <Stack.Screen
        name="MyProducts"
        component={MyProducts}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen name="product-detail" component={ProductDetail}
         options={{
            headerStyle:{
                backgroundColor:'#3b82f6',
            },
            headerTintColor:'#fff',
            headerTitle:'Detail'
        }}
        />
    </Stack.Navigator>
  )
}