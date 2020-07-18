import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';

import {
    Button,
    Text,
    Form,
    Item,
    Input,
    Label,
    Spinner
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { setFormLogin, setUserLogin, resetFormLogin, setIsSigned, setUserToken } from '../../redux/actions'
import { baseUrl, loginUrl } from '../../components/url'
import { postMethod } from '../../components/apimethod/'
import { emailValidation } from '../../components/others'
import AsyncStorage from '@react-native-community/async-storage';


const TabLogin = () => {
    const [isLoading, setLoading] = useState(false)
    const loginState = useSelector((state) => state.LoginReducer)
    const dispatch = useDispatch();

    const onChangeInput = (value, input) => {
        dispatch(setFormLogin(input, value))
    }

    const loginProcess = async () => {
        const url = baseUrl + loginUrl
        const emailValid = emailValidation(loginState.email)
        if (emailValid && loginState.password && !isLoading) {
            setLoading(true)
            const result = await postMethod(url, loginState)
            if (result.data) {
                dispatch(setUserLogin(result.data))
                dispatch(setUserToken(result.data.token))
                await AsyncStorage.setItem('@authToken', result.data.token)
                setLoading(false)
                dispatch(setIsSigned(true))
            }
            else if (result.error) {
                setLoading(false)
                Alert.alert('Kesalahan', result.error,
                    [
                        { text: 'Ok', onPress: () => dispatch(resetFormLogin()) }
                    ],
                    { cancelable: false }
                )
            }
        }
        else if (!emailValid && !isLoading) {
            Alert.alert('Kesalahan', 'Harap Masukan Email Yang Benar!',
                [
                    { text: 'Ok', onPress: () => dispatch(setFormLogin('email', '')) }
                ],
                { cancelable: false }
            )
        }
        else if (!loginState.password && !isLoading) {
            Alert.alert('Kesalahan', 'Password Tidak Boleh Kosong')
        }
    }
    return (
        <>
            <Text style={styles.textJudul}>Login</Text>
            <Form style={{ paddingRight: 10 }}>
                <Item stackedLabel>
                    <Label style={{ color: 'black' }}>E-mail</Label>
                    <Input
                        style={{ color: 'white' }}
                        value={loginState.email}
                        onChangeText={(value) => onChangeInput(value, 'email')} />
                </Item>
                <Item stackedLabel>
                    <Label style={{ color: 'black' }}>Password</Label>
                    <Input
                        style={{ color: 'white' }}
                        value={loginState.password}
                        secureTextEntry={true}
                        onChangeText={(value) => onChangeInput(value, 'password')} />
                </Item>
            </Form>
            <View style={styles.buttonView}>
                <Button full rounded success style={{ marginLeft: 15 }}
                    onPress={loginProcess}
                >
                    {isLoading
                        ? <Spinner color='white'/>
                        : <Text>Login</Text>
                    }
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    textJudul: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 25,
        color: 'white',
    },
    buttonView: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 30,
        marginRight: 10,
    }
});

export default TabLogin;