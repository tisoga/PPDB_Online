import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image
} from 'react-native';

import {
    Container,
    Text,
    Spinner,
} from 'native-base';

import { Background, Logo } from '../../assets';
import { getMethod, getProfile, getSekolah } from '../../components/apimethod';
import { baseUrl, profileUrl } from '../../components/url';
import { useDispatch } from 'react-redux';
import { setUserLogin, setIsSigned, setUserToken, setFormSekolah } from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({ setLoading }) => {
    const url = baseUrl + profileUrl
    const dispatch = useDispatch()

    const checkToken = async () => {
        // console.log(url)
        const token = await AsyncStorage.getItem('@authToken');
        if (token) {
            // console.log(await getProfile(token))
            const result = await getMethod(url, token)
            if (result.data) {
                dispatch(setIsSigned(true))
                dispatch(setUserLogin(result.data))
                dispatch(setUserToken(token))
                setLoading(false)
            }
            else if (result.error) {
                setLoading(false)
            }
        }
        else {
            setLoading(false)
        }

    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <>
            <Container>
                <ImageBackground
                    source={Background}
                    style={styles.imageBackground}
                >
                    <View style={styles.viewLogo}>
                        <Image
                            style={styles.imageLogo}
                            source={Logo}
                        />
                        <Text style={styles.textPPDB}>PPDB Online</Text>
                    </View>
                    <View style={styles.viewSpinner}>
                        <Spinner color='black' style={{ marginTop: 80 }} />
                    </View>
                </ImageBackground>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
    viewLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewSpinner: {
        flex: 1,
    },
    imageLogo: {
        width: 80,
        height: 80
    },
    textPPDB: {
        fontSize: 30,
    },
});

export default SplashScreen