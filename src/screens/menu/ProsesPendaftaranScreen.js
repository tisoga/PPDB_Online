import React, { useEffect } from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from "react-native"

import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Content,
    Text,
} from "native-base"
import { Background3 } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import ProgressCircle from 'react-native-progress-circle'
import { useSelector, useDispatch } from 'react-redux'
import { getMethod } from '../../components/apimethod'
import { profileUrl, baseUrl } from '../../components/url'
import { setUserLogin, setUserToken } from '../../redux/actions'

const ProsesPendaftaranScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    console.log(userState.status)
    const dispatch = useDispatch()
    const getProfile = async () => {
        const urlProfile = baseUrl + profileUrl
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

    useEffect(() => {
        getProfile()
    }, [])

    const StatusSiswa = () => {
        switch (userState.status) {
            case 0:
                status = 'Pelengkapan Identitas Diri';
                break;
            case 1:
                status = 'Pelengkapan Berkas-Berkas';
                break;
            case 2:
                status = 'Pengajuan Pendaftaran';
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                status = 'Proses Seleksi';
                break;
            case 5:
                status = 'Proses Daftar Ulang'
                break;
            case 7:
                status = 'Pendaftaran Ditolak';
                break;
            case 8:
                status = 'Pendaftaran Diterima'
                break
        }
        return (
            <Text style={{ textAlign: 'center', fontSize: 23, fontStyle: 'italic'}}>
                {status}
            </Text>
        )
    }

    const PercentageCircle = () => {
        var status = 0;
        var text = '';
        let color = "#3399FF"
        switch (userState.status) {
            case 0:
                status = 0;
                text = '0%'
                break;
            case 1:
                status = 20;
                text = '20%';
                break;
            case 2:
                status = 40;
                text = '40%';
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                status = 65;
                text = '60%';
                break;
            case 5:
                status = 80;
                text = '80%'
                break;
            case 7:
                color = 'red'
                status = 100;
                text = ''
                break
            case 8:
                status = 100;
                text = '100%'
                break
        }
        return (
            <ProgressCircle
                percent={status}
                radius={35}
                borderWidth={8}
                color={color}
                shadowColor="#999"
                bgColor="#fff"
                outerCircleStyle={{ marginLeft: 10 }}
            >
                <Text style={{ fontSize: 18 }}>{text}</Text>
            </ProgressCircle>
        )
    }

    const RenderBox = () => {
        var box1 = ''
        var box2 = ''
        var box3 = ''
        var box4 = ''
        switch (userState.status) {
            case 0:
                box1 = styles.boxPrimary
                box2 = styles.boxSecondary
                box3 = styles.boxSecondary
                box4 = styles.boxSecondary
                break;
            case 1:
                box1 = styles.boxSucces
                box2 = styles.boxPrimary
                box3 = styles.boxSecondary
                box4 = styles.boxSecondary
                break;
            case 2:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxPrimary
                box4 = styles.boxSecondary
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxSucces
                box4 = styles.boxSecondary
                break;
            case 5:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxSucces
                box4 = styles.boxPrimary
                break;
            case 7:
                box1 = styles.boxDanger
                box2 = styles.boxDanger
                box3 = styles.boxDanger
                box4 = styles.boxDanger
                break;
            case 8:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxSucces
                box4 = styles.boxSucces
                break;
        }
        const navigateToScreen = (val) => {
            if (val === 'identitas'){
                switch (box1) {
                    case styles.boxPrimary:
                        navigation.navigate('PelengkapanIdentitasScreen')
                        break;
                    case styles.boxSucces:
                        Alert.alert('Pemberitahuan','Tahapan Ini Telah Selesai')
                        break;
                    case styles.boxSecondary:
                        Alert.alert('Pembeitahuan','Silahkan Selesaikan Tahap Sebelumnya Terlebih Dahulu')
                        break;
                }
            }
            else if (val === 'berkas'){
                switch (box2) {
                    case styles.boxPrimary:
                        navigation.navigate('PelengkapanBerkasScreen')
                        break;
                    case styles.boxSucces:
                        Alert.alert('Pemberitahuan','Tahapan Ini Telah Selesai')
                        break;
                    case styles.boxSecondary:
                        Alert.alert('Pembeitahuan','Silahkan Selesaikan Tahap Sebelumnya Terlebih Dahulu')
                        break;
                }
            }
            else if (val === 'pengajuan'){
                switch (box3) {
                    case styles.boxPrimary:
                        navigation.navigate('PengajuanScreen')
                        break;
                    case styles.boxSucces:
                        Alert.alert('Pemberitahuan','Tahapan Ini Telah Selesai')
                        break;
                    case styles.boxSecondary:
                        Alert.alert('Pembeitahuan','Silahkan Selesaikan Tahap Sebelumnya Terlebih Dahulu')
                        break;
                }
            }
            else if (val === 'daftar_ulang'){
                switch (box4) {
                    case styles.boxPrimary:
                        navigation.navigate('DaftarUlangScreen')
                        break;
                    case styles.boxSucces:
                        Alert.alert('Pemberitahuan','Tahapan Ini Telah Selesai')
                        break;
                    case styles.boxSecondary:
                        if (box3 === styles.boxSucces){
                            Alert.alert('Pembeitahuan','Silahkan Tunggu Proses Seleksi yang dilakukan oleh admin.')
                        }
                        else{
                            Alert.alert('Pembeitahuan','Silahkan Selesaikan Tahap Sebelumnya Terlebih Dahulu')
                        }
                        break;
                }
            }
        }
        return (
            <>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateToScreen('identitas')}
                    style={box1}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='person' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pelengkapan Identitas Diri</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateToScreen('berkas')}
                    style={box2}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='document' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pelengkapan Berkas-Berkas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateToScreen('pengajuan')}
                    style={box3}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='clipboard' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pengajuan Pendaftaran</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigateToScreen('daftar_ulang')}
                    style={box4}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='git-compare' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Proses Daftar Ulang</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <>
            <Container>
                <ImageBackground
                    source={Background3}
                    style={styles.imageBackground}
                    imageStyle={{ resizeMode: 'stretch' }}
                >
                    <Header transparent>
                        <Left style={{ flex: 1 }} >
                            <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                        </Left>
                        <Body style={{ flex: 12 }}>
                            <Title style={{ alignSelf: 'center' }}>Proses Pendaftaran</Title>
                        </Body>
                    </Header>
                    <Content>
                        <View style={styles.boxOne}>
                            <View style={styles.boxPercentage}>
                                <View style={{ flex: 1, marginTop: 23 }}>
                                    <PercentageCircle />
                                </View>
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'center' }}>Status Pendaftaran</Text>
                                    </View>
                                    <View style={{ flex: 4, flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20 }}>(</Text>
                                        </View>
                                        <View style={{ flex: 20, justifyContent:'center' }}>
                                            <StatusSiswa />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20 }}>)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 2 }} />
                                </View>
                            </View>
                            <View style={styles.boxButton}>
                                <RenderBox />
                            </View>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    },
    boxOne: {
        height: 420,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 5,
        marginHorizontal: 18,
    },
    boxButton: {
        flex: 2.4,
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    boxPercentage: {
        flex: 1,
        flexDirection: 'row',
    },
    boxPrimary: {
        backgroundColor: '#0275d8',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30,
    },
    boxSecondary: {
        backgroundColor: '#868e96',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30
    },
    boxSucces: {
        backgroundColor: '#5cb85c',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30
    },
    boxDanger: {
        backgroundColor: '#d9534f',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30
    }
})

export default ProsesPendaftaranScreen