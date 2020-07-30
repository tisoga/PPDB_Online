import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Alert
} from 'react-native'
import {
    Header,
    Container,
    Left,
    Body,
    Right,
    Title,
    Content,
    H3,
    View,
    Text,
    Form,
    Item,
    Label,
    Input,
    Button,
    Spinner,
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { setBerkasForm, resetBerkasForm, setUserLogin, setUserToken } from '../../redux/actions'
import { isObjectsEmpty } from '../../components/others'
import { putMethod, getProfile } from '../../components/apimethod'
import { baseUrl, berkasUrl } from '../../components/url'

const PelengkapanBerkas = ({ navigation }) => {
    const [fileName, setFileName] = useState({
        'kesehatan': '',
        'ijazah': '',
        'akta': ''
    })
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const formData = useSelector((state) => state.BerkasFormReducer)
    const userState = useSelector((state) => state.UserReducer)
    const selectFoto = async (berkas) => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            // console.log("Response", response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                switch (berkas) {
                    case 'kesehatan':
                        setFileName({ ...fileName, kesehatan: response.fileName })
                        dispatch(setBerkasForm('berkas_kesehatan', {
                            name: response.fileName,
                            uri: response.uri,
                            type: response.type
                        }))
                        break;
                    case 'ijazah':
                        setFileName({ ...fileName, ijazah: response.fileName })
                        dispatch(setBerkasForm('berkas_ijazah', {
                            name: response.fileName,
                            uri: response.uri,
                            type: response.type
                        }))
                        break;
                    case 'akta':
                        setFileName({ ...fileName, akta: response.fileName })
                        dispatch(setBerkasForm('berkas_akta', {
                            name: response.fileName,
                            uri: response.uri,
                            type: response.type
                        }))
                        break;
                }
            }
        });
    }

    useEffect(() => {
        dispatch(resetBerkasForm())
    }, [])

    const saveButton = async () => {
        if (!Number.isFinite(parseFloat(formData.nilai_matematika) && parseFloat(formData.nilai_indonesia)
            && parseFloat(formData.nilai_inggris) && parseFloat(formData.nilai_ipa))) {
            Alert.alert('Kesalahan', 'Harap Masukan angka saja didalam Form Nilai UN')
        }
        else if (isObjectsEmpty(formData)) {
            setLoading(true)
            const url = baseUrl + berkasUrl
            let sendData = new FormData();
            sendData.append('nilai_matematika', parseFloat(formData.nilai_matematika));
            sendData.append('nilai_indonesia', parseFloat(formData.nilai_indonesia));
            sendData.append('nilai_ipa', parseFloat(formData.nilai_ipa));
            sendData.append('nilai_inggris', parseFloat(formData.nilai_inggris));
            sendData.append('berkas_akta', formData.berkas_akta);
            sendData.append('berkas_kesehatan', formData.berkas_kesehatan);
            sendData.append('berkas_ijazah', formData.berkas_ijazah);
            const result = await putMethod(url, sendData, userState.token)
            // console.log(result)
            if (result.data) {
                const profile = await getProfile(userState.token)
                Alert.alert('Berhasil', 'Pelengkapan Berkas-Berkas Berhasil!', [
                    {
                        text: 'Ya', onPress: async () => {
                            navigation.goBack();
                            const token = userState.token
                            dispatch(setUserLogin(profile))
                            dispatch(setUserToken(token))
                        }
                    }
                ], { cancelable: false })
            }
            else if (result.error) {
                Alert.alert('Kesalahan', result.error)
            }
        }
        else {
            Alert.alert('Kesalahan', 'Harap Lengkapi Seluruh Form Terlebih Dahulu.')
        }
        setLoading(false)
    }
    return (
        <Container>
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Proses Pendaftaran</Title>
                </Body>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 200 }]}>
                    <H3 style={{ marginTop: 35, color: 'white' }}>Pelengkapan Berkas-Berkas</H3>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon name='document' size={100} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={styles.penjelasanText}>
                                Pada proses ini, Calon siswa  melengkapi berkas-berkas yang diperlukan, sebagai
                                syarat PPDB Online.
                            </Text>
                        </View>
                    </View>
                </View>
                <Form>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Nilai-Nilai UN</H3>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Indonesia</Label>
                                    <Input keyboardType={"numeric"}
                                        onChangeText={value => {
                                            dispatch(setBerkasForm('nilai_indonesia', value))
                                        }}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Inggris</Label>
                                    <Input keyboardType={"numeric"}
                                        onChangeText={value => {
                                            dispatch(setBerkasForm('nilai_inggris', value))
                                        }}
                                    />
                                </View>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Matematika</Label>
                                    <Input keyboardType={"numeric"}
                                        onChangeText={value => {
                                            dispatch(setBerkasForm('nilai_matematika', value))
                                        }}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>IPA</Label>
                                    <Input keyboardType={"numeric"}
                                        onChangeText={value => {
                                            dispatch(setBerkasForm('nilai_ipa', value))
                                        }}
                                    />
                                </View>
                            </Item>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Upload File</H3>
                        <Item inlineLabel>
                            <Left>
                                <Label>Ijazah / SKHUN</Label>
                                <Text>{fileName.ijazah}</Text>
                            </Left>
                            <Right>
                                <Button onPress={() => selectFoto('ijazah')}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                        <Item inlineLabel style={{ marginTop: 5 }}>
                            <Left>
                                <Label>Akta Kelahiran</Label>
                                <Text>{fileName.akta}</Text>
                            </Left>
                            <Right>
                                <Button onPress={() => selectFoto('akta')}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                        <Item inlineLabel style={{ marginTop: 5 }}>
                            <Left>
                                <Label>Surat Kesehatan</Label>
                                <Text>{fileName.kesehatan}</Text>
                            </Left>
                            <Right>
                                <Button onPress={() => selectFoto('kesehatan')}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                    </View>
                    <View>
                        <Button full
                            onPress={saveButton}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? <Spinner color='white' />
                                : <Text>Simpan</Text>
                            }
                        </Button>
                    </View>
                </Form>
            </Content>
        </Container >
    )
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: '#24d169'
    },
    penjelasanText: {
        flexWrap: 'wrap',
        textAlign: 'justify',
        color: 'white'
    }
})

export default PelengkapanBerkas