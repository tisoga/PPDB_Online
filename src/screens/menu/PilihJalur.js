import React, { useState } from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native'

import {
    Text,
    Header,
    Left,
    Body,
    Title,
    Right,
    Card,
    CardItem,
    H2,
    Button,
    Item,
    Label,
    H3,
    Spinner
} from 'native-base'
import { BackgroundJalur } from '../../assets'

import Icon from 'react-native-vector-icons/Ionicons'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker'
import { isObjectsEmpty } from '../../components/others'
import { baseUrl, pengajuanUrl } from '../../components/url'
import { putMethod, getProfile } from '../../components/apimethod'
import { useSelector, useDispatch } from 'react-redux'
import { setUserLogin, setUserToken } from '../../redux/actions'

const src_height = Dimensions.get('window').height
const data = [
    {
        title: "Zonasi",
        desc: "Jalur Zonasi adalah Jalur Pendaftaran untuk para calon siswa yang berdomisili dalam satu wilayah kabupaten/kota dengan sekolah berasal.",
        desc2: 'Alamat anda harus satu domisli dengan, alamat sekolah ini untuk mengikuti pendaftaran melalui jalur zonasi.'

    },
    {
        title: "Afirmasi",
        desc: "Jalur Afirmasi adalah Jalur Pendaftaran untuk para calon siswa yang menerima program penanganan keluarga tidak mampu dari pemerintah pusat ataupun pemerintah daerah, harus menyertakan bukti mengikuti penanganan keluarga tidak mampu.",
        desc2: 'Silahkan Upload Bukti Mengikuti Penanganan Keluarga Tidak Mampu'
    },
    {
        title: "Perpindahan Orang Tua",
        desc: "Jalur Perpindahan Orangtua / Wali adalah Jalur Pendaftaran untuk para calon siswa yang baru pindah domisili dikarenakan mengikuti tugas atau pekerjaan orang tua / wali, harus menyertakan surat penugasan dari instansi atau perusahaan yang mengerjakan orang tua / wali.",
        desc2: 'Silahkan Upload Surat Penugasan dari Instansi atau Perusahaan'
    },
    {
        title: "Prestasi",
        desc: "Jalur Prestasi adalah Jalur Pendaftaran untuk para calon siswa yang mimiliki prestasi yang ditentukan berdasarkan hasil nilai ujian sekolah atau UN (ujian nasional), hasil perlombaan atau penghargaan di bidang akademik atau non-akademik.",
        desc2: 'Silahkan Upload Sertifikat Penghargaan *Optional'
    },
]


const PilihJalur = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    const sekolahState = useSelector((state) => state.SekolahReducer)
    const alamat_sekolah = JSON.parse(sekolahState.alamat_lengkap_split.replace(/'/g, '"'))
    const alamat_siswa = userState.alamat.split(',')[3].trim()
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [berkas, setBerkas] = useState({
        fileName: '',
        fileUpload: ''
    })
    const [modalData, setModalData] = useState({
        isVisible: false,
        indexChoose: 0,
    })

    const selectFoto = async () => {
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
                setBerkas({
                    ...berkas,
                    ['fileName']: response.fileName,
                    ['fileUpload']: {
                        name: response.fileName,
                        uri: response.uri,
                        type: response.type
                    }
                })
            }
        });
    }

    const ajukanPendaftaran = async (jalur) => {
        const url = baseUrl + pengajuanUrl
        let sendData = new FormData()
        let verification = false
        switch (jalur) {
            case 'Zonasi':
                console.log('Jalur Zonasi')
                sendData.append('status', 10)
                sendData.append('jalur_pendaftaran', 'Zonasi')
                verification = true
                break;
            case 'Afirmasi':
                if (isObjectsEmpty(berkas)) {
                    console.log('Jalur Afirmasi')
                    sendData.append('status', 11)
                    sendData.append('jalur_pendaftaran', 'Afirmasi')
                    sendData.append('berkas_tambahan', berkas.fileUpload)
                    verification = true
                }
                else {
                    Alert.alert('Kesalahan', 'Silahkan Pilih File Terlebih Dahulu.')
                }
                break;
            case 'Prestasi':
                console.log('Jalur Prestasi')
                if (berkas.fileUpload){
                    sendData.append('berkas_tambahan', berkas.fileUpload)
                }
                sendData.append('jalur_pendaftaran', 'Prestasi')
                sendData.append('status', 13)
                verification = true
                break;
            default:
                if (isObjectsEmpty(berkas)) {
                    console.log('Jalur Perpindahan Orang Tua')
                    sendData.append('berkas_tambahan', berkas.fileUpload)
                    sendData.append('jalur_pendaftaran', 'Perpindahan OrangTua')
                    sendData.append('status', 12)
                    verification = true
                }
                else {
                    Alert.alert('Kesalahan', 'Silahkan Pilih File Terlebih Dahulu.')
                }
                break;
        }
        if (verification) {
            if (jalur === 'Zonasi' && alamat_sekolah.kabupaten !== alamat_siswa){
                Alert.alert('Kesalahan', 'Maaf Anda Tidak dapat Memilih Jalur Zonasi, dikarenkan alamat anda tidak satu domisili dengan sekolah.')
            }
            else{
                // console.log('satu')
                // console.log(alamat_sekolah.kabupaten)
                // console.log(alamat_siswa)
                setLoading(true)
                const result = await putMethod(url, sendData, userState.token)
                if (result.data) {
                    const profile = await getProfile(userState.token)
                    Alert.alert('Berhasil', 'Pendaftaran melalui Jalur ' + jalur + ' berhasil, Silahkan tunggu hasil dari proses seleksi', [
                        {
                            text: 'Ya', onPress: () => {
                                navigation.navigate('ProsesScreen')
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
        }
        setLoading(false)
    }

    const JalurCard = ({ item, index }) => {
        return (
            <Card>
                <CardItem style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{item.title}</Text>
                </CardItem>
                <CardItem>
                    <Text style={{ color: '#6A6A6A', textAlign: 'justify', fontSize: 13 }}>
                        {item.desc}
                    </Text>
                </CardItem>
                <CardItem footer>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalData({
                                    ...modalData,
                                    ['isVisible']: true
                                });
                                setBerkas({
                                    ...berkas,
                                    ['fileName']: '',
                                    ['fileUpload']: ''
                                })
                            }}
                            style={styles.buttonBox}
                            activeOpacity={0.8}
                        >
                            <Right>
                                <Text style={{ color: 'white' }}>Pilih Jalur</Text>
                            </Right>
                        </TouchableOpacity>
                    </View>
                </CardItem>
            </Card>
        )
    }

    return (
        <ImageBackground
            source={BackgroundJalur}
            style={styles.imageBackground}
            imageStyle={{ resizeMode: 'stretch' }}
        >
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Pengajuan Pendaftaran</Title>
                </Body>
            </Header>
            <Modal isVisible={modalData.isVisible}
                style={styles.viewModal}
                onBackButtonPress={() => {
                    setModalData({ ...modalData, ['isVisible']: false });
                }}
                onBackdropPress={() => {
                    setModalData({ ...modalData, ['isVisible']: false });
                }}
            >
                <View style={styles.containerModal}>
                    <View style={styles.viewTitleModal}>
                        <Title style={{ color: 'black' }}>Jalur {data[modalData.indexChoose].title}</Title>
                    </View>
                    <View style={styles.viewContentModal}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>
                            {data[modalData.indexChoose].desc2}
                        </H3>
                        <View style={{ padding: 10 }}>
                            {data[modalData.indexChoose].title !== 'Zonasi' &&
                                <Item inlineLabel>
                                    <Left>
                                        <Label>Upload File</Label>
                                        <Text>{berkas.fileName}</Text>
                                    </Left>
                                    <Right>
                                        <Button onPress={() => selectFoto()}>
                                            <Text>Pilih File</Text>
                                        </Button>
                                    </Right>
                                </Item>
                            }
                        </View>
                    </View>
                    <View style={styles.buttonContentModal}>
                        <Button full
                            onPress={() => ajukanPendaftaran(data[modalData.indexChoose].title)}
                        >
                            {isLoading
                                ? <Spinner color='white' />
                                : <Text>Ajukan Pendaftaran</Text>
                            }
                        </Button>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1.3, marginHorizontal: 22, justifyContent: 'flex-end', marginTop: src_height - 485 }}>
                <H2 style={{ color: 'white', fontWeight: 'bold', marginLeft: '8%' }}>Pilih Jalur Pendaftaran</H2>
                <Carousel
                    data={data}
                    renderItem={JalurCard}
                    sliderWidth={345}
                    itemWidth={300}
                    onSnapToItem={(index) => setModalData({ ...modalData, ['indexChoose']: index })}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={modalData.indexChoose}
                    containerStyle={{ marginBottom: '0%' }}
                    dotColor={'black'}
                    inactiveDotColor={'red'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    },
    headerColor: {
        backgroundColor: '#87ceeb'
    },
    buttonBox: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#0275d8',
        height: 30,
        width: 85,
        backgroundColor: '#0275d8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModal: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        margin: 0,
        marginHorizontal: 10
    },
    containerModal: {
        backgroundColor: 'white',
        height: 250,
        // justifyContent: 'flex-end',
        borderRadius: 10
    },
    viewTitleModal: {
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#87ceeb',
        flex: 1,
    },
    viewContentModal: {
        marginTop: 10,
        flex: 6
    },
    buttonContentModal: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1
    }
})
export default PilihJalur