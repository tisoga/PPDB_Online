import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { SplashScreen } from './src/screens/authentication'
import { HomeNavigation, AuthNavigation } from './src/route';
import { HomeScreen, ProsesPendaftaranScreen, ProfileScreen, PelengkapanIdentitasScreen, PelengkapanBerkas } from './src/screens/menu';

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
