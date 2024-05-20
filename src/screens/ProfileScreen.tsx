import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import MyProducts from './MyProducts';
import { Ionicons } from '@expo/vector-icons';
import ExploreScreen from './ExploreScreen';
import AddPostScreen from './AddPostScreen';
import AgencyForm from './AgencyForm';


export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('Profile');

  const menuList = [
    {
      id: 1,
      name: 'Meus produtos',
      icon: require('../../assets/images/diary.png'),
      screen: 'MyProducts',
    },
    {
      id: 2,
      name: 'Adicionar produto',
      icon: require('../../assets/images/add.png'),
      screen: 'AddPostScreen',
    },
    {
      id: 3,
      name: 'Agência',
      icon: require('../../assets/images/globe.png'),
      screen: 'AgencyForm',
    },
    {
      id: 4,
      name: 'Sair',
      icon: require('../../assets/images/logout.png'),
      screen: 'Logout',
    },
    
  ];

  const onMenuPress = (screen) => {
    if (screen === 'Logout') {
      signOut();
    } else {
      setCurrentScreen(screen);
    }
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Profile':
        return (
          <View style={{ padding: 5, backgroundColor: 'white', flex: 1 }}>
            <View style={{ alignItems: 'center', marginTop: 14 }}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 2 }}>{user?.fullName}</Text>
              <Text style={{ fontSize: 18, marginTop: 2, color: '#888888' }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <FlatList
              data={menuList}
              numColumns={3}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onMenuPress(item.screen)}
                  style={{
                    flex: 1,
                    padding: 3,
                    borderWidth: 1,
                    alignItems: 'center',
                    marginHorizontal: 2,
                    marginTop: 4,
                    borderRadius: 10,
                    borderColor: '#3182CE',
                    backgroundColor: '#EDF2F7',
                  }}
                >
                  {item.icon && <Image source={item.icon} style={{ width: 50, height: 50 }} />}
                  <Text style={{ fontSize: 12, marginTop: 2, color: '#000000' }}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        );
      case 'MyProducts':
        // Render MyProducts screen component here
        return <MyProducts/>;
      case 'Explore':
        // Render Explore screen component here
        return <ExploreScreen/>;
        case 'AddPostScreen':
          // Render Explore screen component here
          return <AddPostScreen/>;
      case 'AgencyForm':
        // Render TubeGuruji screen component here
        return <AgencyForm/>;
      default:
        return null;
    }
  };

  const renderBackButton = () => {
    if (currentScreen !== 'Profile') {
      return (
        <TouchableOpacity
          onPress={() => setCurrentScreen('Profile')}
          style={{
            marginTop:30,
            padding: 0,
            marginBottom: 0,
            borderRadius: 10,
            backgroundColor: '#EDF2F7',
            alignSelf: 'flex-start',
          }}
        >
        <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderBackButton()}
      {renderContent()}
    </View>
  );
}
