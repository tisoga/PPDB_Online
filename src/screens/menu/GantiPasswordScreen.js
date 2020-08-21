import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Alert,
} from "react-native"
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Content,
    Text,
    Input,
    Form,
    Item,
    Label,
    Button,
} from "native-base"
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { baseUrl, changePasswordUrl } from '../../components/url'
import { postMethod } from '../../components/apimethod'

const GantiPasswordScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    const [checking, setChecking] = useState(true)
    const url = baseUrl + changePasswordUrl
    const [data, setData] = useState({
        "old_password": "",
        "new_password": "",
        "confirm_password": ""

    })

    const changePassword = async (val) => {
        if (val === 'check') {
            if (data.old_password) {
                const result = await postMethod(url, data, userState.token)
                if (result.data) {
                    Alert.alert('Berhasil', 'Silahkan Masukan Password Baru!', [
                        {
                            text: 'Ya', onPress: () => {
                                setChecking(!checking)
                            }
                        }
                    ], { cancelable: false })
                }
                else if (result.error) {
                    Alert.alert('Kesalahan', result.error, [
                        {
                            text: 'Ya', onPress: () => {
                                setData({ ...data, ['old_password']: '' })
                            }
                        }
                    ])
                }
            }
            else {
                Alert.alert('Kesalhan', 'Password Lama Tidak Boleh Kosong')
            }
        }
        else if (val === 'change') {
            if (data.new_password === data.confirm_password) {
                const result = await postMethod(url, data, userState.token)
                if (result.data) {
                    Alert.alert('Berhasil', 'Perubahan Password Berhasil!', [
                        {
                            text: 'Ya', onPress: () => {
                                navigation.goBack();
                            }
                        }
                    ], { cancelable: false })
                }
                else if (result.error) {
                    Alert.alert('Kesalahan', result.error, [
                        {
                            text: 'Ya', onPress: () => {
                                setData({ ...data, ['new_password']: '' });
                                setData({ ...data, ['confirm_password']: '' });
                            }
                        }
                    ])
                }
            }
            else {
                Alert.alert('Kesalahan', "Password Tidak Sama", [
                    {
                        text: 'Ya', onPress: () => {
                            setData({
                                ...data,
                                ['new_password']: '',
                                ['confirm_password']: '' });
                        }
                    }
                ])
            }
        }
    }
    return (
        <>
            <Container>
                <Header style={{ marginTop: 20 }}>
                    <Left style={{ flex: 1 }} >
                        <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                    </Left>
                    <Body style={{ flex: 12 }}>
                        <Title style={{ alignSelf: 'center' }}>Ganti Password</Title>
                    </Body>
                </Header>
                <Content>
                    <View>
                        <Form>
                            <Item stackedLabel>
                                <Label>Password Lama</Label>
                                <Input
                                    value={data.old_password}
                                    onChangeText={(value) => setData({ ...data, ['old_password']: value })}
                                    secureTextEntry={true}
                                    disabled={!checking}
                                />
                            </Item>
                            <Button success style={{ justifyContent: 'center', marginTop: 10 }}
                                onPress={() => changePassword('check')}
                                disabled={!checking}
                            >
                                <Text>Check Password</Text>
                            </Button>
                        </Form>
                        {!checking &&
                            <Form>
                                <Item stackedLabel>
                                    <Label>Password Baru</Label>
                                    <Input
                                        value={data.new_password}
                                        onChangeText={(value) => setData({ ...data, ['new_password']: value })}
                                        secureTextEntry={true}
                                        disabled={checking}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Konfirmasi Password</Label>
                                    <Input
                                        value={data.confirm_password}
                                        onChangeText={(value) => setData({ ...data, ['confirm_password']: value })}
                                        secureTextEntry={true}
                                        disabled={checking}
                                    />
                                </Item>
                                <Button success style={{ justifyContent: 'center', marginTop: 10 }}
                                    onPress={() => changePassword('change')}
                                    disabled={checking}
                                >
                                    <Text>Ganti Password</Text>
                                </Button>
                            </Form>
                        }

                    </View>
                </Content>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({

})

export default GantiPasswordScreen