// app.routes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import StackNav from './stackNav';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import Categories from '../components/HomeScreen/Categories';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
      <Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e91e63' }}>
        <Screen
          name="Home"
          component={StackNav}
          options={{
            tabBarIcon: ({ color, size }) => <Entypo name="home" size={24} color="black" />,
          }}
        />
        <Screen
          name="Explorar"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={24} color="black" />,
          }}
        />
        <Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" size={24} color="black" />,
          }}
        />
        
      </Navigator>

  );
}
