import React, { useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TestScreen from '../screens/TestScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    WelcomeScreen,
    EventScreen,
    NotifikasiScreen,
    ProsesPendaftaranScreen,
    HomeScreen,
    ProfileScreen,
    PelengkapanIdentitasScreen,
    PelengkapanBerkas,
    PengajuanPendaftaranScreen,
    PilihJalurScreen,
    BerkasScreen
} from "../screens/menu";
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const EventStack = createStackNavigator()
const NotifikasiStack = createStackNavigator()
const ProfileStack = createStackNavigator()


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            initialRouteName='HomeScreen'
        >
            <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name='ProsesScreen' component={ProsesPendaftaranScreen} options={{ headerShown: false }} />
            <HomeStack.Screen
                name='PelengkapanIdentitasScreen'
                component={PelengkapanIdentitasScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='PelengkapanBerkasScreen'
                component={PelengkapanBerkas}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='BerkasScreen'
                component={BerkasScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='PengajuanScreen'
                component={PengajuanPendaftaranScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='PilihJalurScreen'
                component={PilihJalurScreen}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    )
}

const EventStackScreen = () => {
    return (
        <EventStack.Navigator>
            <EventStack.Screen name='EventScreen' component={EventScreen} options={{ headerShown: false }} />
        </EventStack.Navigator>
    )
}

const NotifikasiStackScreen = () => {
    return (
        <NotifikasiStack.Navigator>
            <NotifikasiStack.Screen name='NotifikasiScreen' component={NotifikasiScreen} options={{ headerShown: false }} />
        </NotifikasiStack.Navigator>
    )
}

const ProfileStackSCreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    )
}

const HomeNavigation = () => {
    const [isLoadingHome, setLoadingHome] = useState(true)
    const welcome = useSelector((state) => state.IsWelcomeReducer)
    if (welcome.isLoading) {
        return (
            <WelcomeScreen setLoading={setLoadingHome} />
        )
    }
    else {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'HomeTab') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'JadwalTab') {
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                        } else if (route.name === 'NotifikasiTab') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        } else if (route.name === 'ProfileTab') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        }
                        return <Icon name={iconName} size={size} style={{ color: 'tomato' }} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name='HomeTab' component={HomeStackScreen} options={{ tabBarLabel: 'Beranda' }} />
                <Tab.Screen name='JadwalTab' component={EventStackScreen} options={{ tabBarLabel: 'Jadwal PPDB' }} />
                <Tab.Screen name='NotifikasiTab' component={NotifikasiStackScreen} options={{ tabBarLabel: 'Notifikasi' }} />
                <Tab.Screen name='ProfileTab' component={ProfileStackSCreen} options={{ tabBarLabel: 'Profile' }} />
            </Tab.Navigator>
        )
    }
}

export default HomeNavigation