// stackNav.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ItemList from '../screens/ItemList';
import { Home } from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
      {/* @ts-ignore */}
      <Stack.Screen name='item-list' component={ItemList} options={({route}) => ({title:route.params.category,
        headerStyle:{
          backgroundColor: '#D14113',
        
        },
        headerTintColor: '#FAFAFA',
      })} />
       <Stack.Screen name='product-detail' component={ProductDetail}options={{headerStyle:{ 
          backgroundColor: '#D14113',
        
        },
        headerTitle: "Detalhes do produto",
        headerTintColor: '#FAFAFA',}} />
    </Stack.Navigator>
  );
}
