import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { SplashScreen } from './src/screens/authentication'
import { HomeNavigation, AuthNavigation } from './src/route';
import SandBox from './src/screens/SandBox';
import { PelengkapanIdentitasScreen, CekKuotaScreen } from './src/screens/menu';
import CekPengumuman from './src/screens/menu/CekPengumuman';
import GantiPasswordScreen from './src/screens/menu/GantiPasswordScreen'
const App: () => React$Node = () => {
    const [isLoading, setLoading] = useState(true)
    const isSignedIn = useSelector((state) => state.IsSignedReducer.isSigned)
    if (isLoading) {
        return (
            <NavigationContainer>
                <SplashScreen setLoading={setLoading} />
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                {isSignedIn
                    ? <HomeNavigation />
                    : <AuthNavigation />
                }
            </NavigationContainer>
        );
    }
};

export default App;
