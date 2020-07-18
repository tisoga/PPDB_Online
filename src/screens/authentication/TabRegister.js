import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Alert,
} from 'react-native';

import {
    Button,
    Text,
    Form,
    Item,
    Input,
    Label,
    Spinner,
} from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import { setFormRegister, setPageTabs } from '../../redux/actions';
import { postMethod } from '../../components/apimethod';
import { baseUrl, registerUrl } from '../../components/url';
import { emailValidation, isObjectsEmpty } from '../../components/others';


const TabRegister = ({setPage}) => {
    const [isLoading, setLoading] = useState(false)
    const registerState = useSelector((state) => state.RegisterReducer)
    const dispatch = useDispatch();
    const onChangeInput = (value, input) => {
        dispatch(setFormRegister(input, value))
        setPage(1)
    }

    const loginProcess = async () => {
        const url = baseUrl + registerUrl
        const emailValid = emailValidation(registerState.email)
        const passValid = registerState.password === registerState.password2
        const isNotEmpty = isObjectsEmpty(registerState)
        if (emailValid && passValid && isNotEmpty && !isLoading) {
            setLoading(true)
            const result = await postMethod(url, registerState)
            if (result.data) {
                setLoading(false)
                Alert.alert('Berhasil', 'Registrasi Akun Berhasil, Silahkan Login',
                    [
                        { text: 'OK', onPress: () => setPage(0) }
                    ],
                    { cancelable: false })
            }
            else if (result.error) {
                setLoading(false)
                Alert.alert('Kesalahan', result.error,
                    [
                        { text: 'Ok', onPress: () => dispatch(setFormRegister('email','')) }
                    ],
                    { cancelable: false }
                )
            }
        }
        else if (!emailValid && !isLoading) {
            Alert.alert('Kesalahan', 'Harap Masukan Email Yang Benar!',
                [
                    { text: 'Ok', onPress: () => dispatch(setFormRegister('email', '')) }
                ],
                { cancelable: false }
            )
        }
        else if (!isNotEmpty && !isLoading) {
            Alert.alert('Kesalahan', 'Harap Isi Semua Forms')
        }
        else if (!passValid && !isLoading) {
            Alert.alert('Kesalahan', 'Password Tidak Sesuai!',
                [
                    {
                        text: 'Ok', onPress: () => {
                            dispatch(setFormRegister('password', ''));
                            dispatch(setFormRegister('password2', ''));
                        }
                    }
                ],
                { cancelable: false }
            )
        }
    }
    return (
        <>
            <Text style={styles.textJudul}>Register</Text>
            <Form style={{ paddingRight: 10, flexDirection: 'row' }}>
                <Item stackedLabel style={{ flex: 1 }}>
                    <Label style={{ color: 'black' }}>Nama Depan</Label>
                    <Input style={{ color: 'white' }}
                        value={registerState.first_name}
                        onChangeText={(value) => onChangeInput(value, 'first_name')} />
                </Item>
                <Item stackedLabel style={{ flex: 1 }}>
                    <Label style={{ color: 'black' }}>Nama Belakang</Label>
                    <Input style={{ color: 'white' }}
                        value={registerState.last_name}
                        onChangeText={(value) => onChangeInput(value, 'last_name')} />
                </Item>
            </Form>
            <Form>
                <Item stackedLabel>
                    <Label style={{ color: 'black' }}>Email</Label>
                    <Input style={{ color: 'white' }}
                        value={registerState.email}
                        onChangeText={(value) => onChangeInput(value, 'email')} />
                </Item>
            </Form>
            <Form style={{ paddingRight: 10, flexDirection: 'row' }}>
                <Item stackedLabel style={{ flex: 1 }}>
                    <Label style={{ color: 'black' }}>Password</Label>
                    <Input style={{ color: 'white' }} secureTextEntry={true}
                        value={registerState.password}
                        onChangeText={(value) => onChangeInput(value, 'password')} />
                </Item>
                <Item stackedLabel style={{ flex: 1 }}>
                    <Label style={{ color: 'black' }}>Confirm Password</Label>
                    <Input style={{ color: 'white' }} secureTextEntry={true}
                        value={registerState.password2}
                        onChangeText={(value) => onChangeInput(value, 'password2')} />
                </Item>
            </Form>
            <View style={{ marginTop: 20, marginRight: 10, flex: 1, alignItems: 'flex-end' }}>
                <Button full rounded success style={{ marginLeft: 15 }}
                    onPress={loginProcess}
                >
                    {isLoading
                        ? <Spinner color='white'/>
                        : <Text>Register</Text>
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
    }
});

export default TabRegister;