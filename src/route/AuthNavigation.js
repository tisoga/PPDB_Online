import React, { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { MainScreen } from "../screens/authentication";

const Stack = createStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={MainScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthNavigation