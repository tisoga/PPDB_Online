import React, { useState } from 'react'
import {
    StyleSheet,
    Dimensions,
    Image,
    Alert
} from 'react-native'
import {
    Header,
    Container,
    Left,
    Content,
    View,
    Text,
    Button,
    Card,
    CardItem,
    ListItem,
    Spinner,
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import { Background } from '../../assets'
import ImagePicker from 'react-native-image-picker'
import { baseUrl, pengajuanUrl } from '../../components/url'
import { patchMethod } from '../../components/apimethod'
import { setUserLogin, setUserToken } from '../../redux/actions'

const src_height = Dimensions.get('window').height

const UploadBerkasScreen = ({ navigation, route }) => {
    const { title } = route.params;
    const [isLoading, setLoading] = useState(false)
    const userState = useSelector((state) => state.UserReducer)
    const dispatch = useDispatch()
    const [file, setFile] = useState({
        name: '',
        data: ''
    })

    const selectFile = async () => {
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            console.log("Response", response.fileName);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setFile({
                    ...file,
                    ['name']: response.fileName,
                    ['data']: {
                        name: response.fileName,
                        uri: response.uri,
                        type: response.type
                    }
                })
            }
        });
    }

    const uploadFile = async () => {
        const url = baseUrl + pengajuanUrl
        let sendData = new FormData()
        if (file.data) {
            switch (title) {
                case 'Foto Diri':
                    sendData.append('foto_diri', file.data)
                    break;
                case 'Surat Kesehatan':
                    sendData.append('berkas_kesehatan', file.data)
                    break;
                case 'SKHUN / Ijazah':
                    sendData.append('berkas_ijazah', file.data)
                    break;
                case 'Akta Kelahiran':
                    sendData.append('berkas_akta', file.data)
                    break;
            }
            const result = await patchMethod(url, sendData, userState.token)
            if (result.data) {
                Alert.alert('Berhasil', 'Penggantian berkas ' + title + ' berhasil !', [
                    {
                        text: 'Ya', onPress: () => {
                            navigation.goBack();
                            const token = userState.token
                            dispatch(setUserLogin(result.data))
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
            Alert.alert('Kesalahan', 'Silahkan Pilih File Terlebih Dahulu')
        }
    }

    return (
        <Container style={{ backgroundColor: '#B7B7B7' }}>
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 130 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name='cloud-upload' size={80} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: 'column', marginTop: 20, marginLeft: 10 }}>
                            <Text style={styles.penjelasanText}>Upload</Text>
                            <Text style={styles.penjelasanText}>{title}</Text>
                        </View>
                    </View>
                </View>
                <Content padder>
                    <Card style={{ height: src_height - 300 }}>
                        <CardItem style={{ flex: 1, backgroundColor: '#87ceeb' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <ListItem>
                                    <Button style={{ borderRadius: 10 }}
                                        onPress={selectFile}
                                    >
                                        <Text>Pilih File</Text>
                                    </Button>
                                    <Button style={{ borderRadius: 10, marginLeft: 10 }} success
                                        onPress={() => uploadFile()}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? <Spinner color='white' />
                                            : <Text>Upload FIle</Text>
                                        }
                                    </Button>
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem style={{ backgroundColor: 'white', flex: 4 }}>
                            {file.data
                                ? <Image
                                    source={{ uri: file.data.uri }}
                                    style={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
                                />
                                :
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'center' }}>Gambar Belum Dipilih</Text>
                                </View>
                            }
                        </CardItem>
                    </Card>

                </Content>
            </Content>
        </Container >
    )
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: '#0275d8'
    },
    penjelasanText: {
        flexWrap: 'wrap',
        textAlign: 'justify',
        color: 'white',
        fontSize: 20
    }
})

export default UploadBerkasScreen