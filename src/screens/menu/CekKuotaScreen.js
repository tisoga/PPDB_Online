import React from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native"

import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Content,
    Text,
    H3,
} from "native-base"
import { Background3 } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import ProgressCircle from 'react-native-progress-circle'
import { useSelector } from 'react-redux'

const CekKuotaScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    const sekolahState = useSelector((state) => state.SekolahReducer)
    const alamat_lengkap = JSON.parse(sekolahState.alamat_lengkap_split.replace(/'/g, '"'))

    const RenderBox = () => {
        const daya_tampung = sekolahState.daya_tampung
        const zonasi = parseInt(daya_tampung * 0.50)
        const afirmasi = parseInt(daya_tampung * 0.15)
        const perpindahan = parseInt(daya_tampung * 0.05)
        let prestasi = parseInt(daya_tampung * 0.30)
        const sisa = daya_tampung - (zonasi + afirmasi + perpindahan + prestasi)
        prestasi = prestasi + sisa
        return (
            <>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.box}
                >
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.boxAngka}>{zonasi}</Text>
                    </View>
                    <View style={styles.boxView}>
                        <Text style={styles.boxText}>Jalur Zonasi</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.box}
                >
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.boxAngka}>{afirmasi}</Text>
                    </View>
                    <View style={styles.boxView}>
                        <Text style={styles.boxText}>Jalur Afirmasi</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.box}
                >
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.boxAngka}>{perpindahan}</Text>
                    </View>
                    <View style={styles.boxView}>
                        <Text style={styles.boxText}>
                            Jalur Perpindahan Orang Tua
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.box}
                >
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.boxAngka}>{prestasi}</Text>
                    </View>
                    <View style={styles.boxView}>
                        <Text style={styles.boxText}>
                            Jalur Prestasi
                        </Text>
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
                            <Title style={{ alignSelf: 'center' }}>Cek Kuota Pendaftaran</Title>
                        </Body>
                    </Header>
                    <Content style={{ marginTop: 20 }}>
                        <View style={styles.boxOne}>
                            <View style={{ padding: 10, borderBottomWidth: 1 }}>
                                <H3 style={{ textAlign: 'center' }}>{sekolahState.nama}</H3>
                                <Text style={{ color: '#6A6A6A', textAlign: 'center', fontSize: 13 }}>
                                    {alamat_lengkap.lengkap}, {alamat_lengkap.desa}, {alamat_lengkap.kecamatan}, {alamat_lengkap.kabupaten}, {alamat_lengkap.provinsi}
                                </Text>
                            </View>
                            <H3 style={{ textAlign: 'center', marginTop: 10 }}>Daya Tampung Sekolah : {sekolahState.daya_tampung}</H3>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 30 }}>
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
    box: {
        backgroundColor: '#5cb85c',
        height: 100,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30,
        justifyContent: 'center',
    },
    boxView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#87ceeb',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText: {
        fontSize: 13,
        color: 'black',
        textAlign: 'center'
    },
    boxAngka: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default CekKuotaScreen