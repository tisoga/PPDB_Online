import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Alert
} from 'react-native';

import {
    Container,
    Text,
    Spinner,
    Button,
} from 'native-base';

import { Background2, Logo } from '../../assets';
import { getMethod } from '../../components/apimethod';
import { baseUrl, notifikasiUrl, eventsUrl, profileUrl } from '../../components/url';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifikasi, setEvents, setWelcome, setUserLogin, setUserToken } from '../../redux/actions';

const WelcomeScreen = () => {
    const userState = useSelector((state) => state.UserReducer)
    const urlNotifikasi = baseUrl + notifikasiUrl
    const urlEvents = baseUrl + eventsUrl
    const urlProfile = baseUrl + profileUrl
    const dispatch = useDispatch()
    // console.log(userState)

    const getProfile = async () => {
        const token = userState.token
        const result = await getMethod(urlProfile, userState.token)
        if (result.data) {
            dispatch(setUserLogin(result.data))
            dispatch(setUserToken(token))
        }
        else if (result.error) {
            Alert.alert('Kesalahan', result.error)
        }

    }

    const getNotifikasi = async () => {
        result = await getMethod(urlNotifikasi, userState.token)
        if (result.data) {
            dispatch(setNotifikasi(result.data))
        }
        else if (result.error === 'Not found.') {
            dispatch(setNotifikasi([]))
        }
        else {
            Alert.alert('Kesalahan', result.error)
        }
    }

    const getEvents = async () => {
        result = await getMethod(urlEvents, userState.token)
        if (result.data) {
            dispatch(setEvents(result.data))
            dispatch(setWelcome(false))
        }
        else {
            Alert.alert('Kesalahan', result.error)
        }
    }

    const getInformation = async () => {
        getProfile()
        getNotifikasi()
        getEvents()
    }

    useEffect(() => {
        getInformation()
    }, [])

    return (
        <>
            <Container>
                <ImageBackground
                    source={Background2}
                    style={styles.imageBackground}
                >
                    <View style={styles.viewLogo}>
                        <Image
                            style={styles.imageLogo}
                            source={Logo}
                        />
                    </View>
                    <Text style={styles.textOne}>LOGIN BERHASIL!</Text>
                    <Text style={styles.textTwo}>SELAMAT DATANG</Text>
                    <Text style={styles.textThree}>{userState.user.first_name + ' ' + userState.user.last_name}</Text>
                    <View style={styles.viewSpinner}>
                        <Spinner color='white' style={{ marginTop: 100 }} />
                        <Text style={styles.textFour}>Mohon Tunggu ...</Text>
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
        flex: 1.4,
    },
    imageLogo: {
        width: 80,
        height: 80
    },
    textOne: {
        marginLeft: 20,
        fontSize: 30,
        color: 'white'
    },
    textTwo: {
        marginLeft: 40,
        fontSize: 30,
        color: 'white'
    },
    textThree: {
        marginLeft: 60,
        fontSize: 30,
        color: 'black'
    },
    textFour: {
        fontSize: 13,
        textAlign: 'center'
    }
});

export default WelcomeScreen