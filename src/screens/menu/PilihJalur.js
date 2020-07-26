import React, { useState } from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions
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
    H3
} from 'native-base'
import { BackgroundJalur } from '../../assets'

import Icon from 'react-native-vector-icons/Ionicons'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-picker'
import { isObjectsEmpty } from '../../components/others'

const src_height = Dimensions.get('window').height
const data = [
    {
        title: "Zonasi",
        desc: "Jalur Zonasi adalah Jalur Pendaftaran untuk para calon siswa yang berdomisili dalam satu wilayah kabupaten/kota dengan sekolah berasal.",
        desc2: 'Maaf Anda Tidak Bisa Mengambil Jalur Zonasi, dikarenakan alamat anda tidak satu domisili dengan sekolah ini'

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
    const [isVisibleModal, setVisibleModal] = useState(false)
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
        switch (jalur) {
            case 'Zonasi':
                console.log('Jalur Zonasi')
                break;
            case 'Afirmasi':
                if (isObjectsEmpty(berkas)) {
                    console.log('Jalur Afirmasi')
                }
                else {
                    console.log('Tidak Ada File')
                }
                break;
            case 'Prestasi':
                console.log('Jalur Prestasi')
                break;
            default:
                if (isObjectsEmpty(berkas)) {
                    console.log('Jalur Perpindahan Orang Tua')
                }
                else {
                    console.log('Tidak Ada File')
                }
                break;
        }
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
                            <Text>Ajukan Pendaftaran</Text>
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