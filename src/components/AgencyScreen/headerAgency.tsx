import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser, useAuth, SignedOut } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { Login } from '../../screens/Login';

export default function HeaderAgency() {
    const { user } = useUser();
  
    const handleLogout = () => {
        <SignedOut>
            <Login/>
        </SignedOut>
    };

    return (
        <View style={{ marginBottom: 1 }}>
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Image source={{ uri: user?.imageUrl }} style={{ height: 40, width: 40, borderRadius: 100 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Olá </Text>
                        <Text style={{ fontSize: 15 }}>{user?.fullName}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <Feather name="log-out" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 50, marginTop: 15 }}>
                <Feather name="search" size={18} color="black" style={{ marginRight: 10 }} />
                <TextInput placeholder='Pesquisar' style={{ flex: 1 }} />
            </View>
        </View>
    );
}
