import React from 'react'
import {
    StyleSheet
} from 'react-native'
import {
    Header,
    Container,
    Left,
    Body,
    Title,
    Content,
    H3,
    View,
    Text,
    Form,
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector} from 'react-redux'


const DaftarUlang = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    const sekolahState = useSelector((state) => state.SekolahReducer)
    const alamat_lengkap = JSON.parse(sekolahState.alamat_lengkap_split.replace(/'/g, '"'))
    const tanggal = JSON.parse(sekolahState.jam_tanggal_ulang.replace(/'/g, '"'))

    return (
        <Container>
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Daftar Ulang</Title>
                </Body>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 160 }]}>
                    <H3 style={{ marginTop: 4, color: 'white' }}>Daftar Ulang</H3>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon name='git-compare' size={100} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={styles.penjelasanText}>
                                Pada Proses Ini calon siswa, akan diberikan informasi tata cara dan hal-hal yang diperlukan dalam proses daftar ulang
                            </Text>
                        </View>
                    </View>
                </View>
                <Form>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Informasi Daftar Ulang</H3>
                        <View style={{ flexDirection: 'column', marginBottom: 14 }}>
                            <Text style={{ textAlign: 'justify', padding: 10 }}>
                                Silahkan Calon Siswa Datang ke Sekolah {sekolahState.nama} untuk melaksanakan daftar ulang,
                                berikut ini adalah jadwal dan hal-hal yang perlu di bawa dalam pendaftaran ulang :
                            </Text>
                            <View style={{ flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, fontWeight: 'bold' }}>Alamat </Text>
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>:</Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        {alamat_lengkap.lengkap}, {alamat_lengkap.desa}, {alamat_lengkap.kecamatan}, {alamat_lengkap.kabupaten}, {alamat_lengkap.provinsi}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', borderBottomWidth:1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, fontWeight: 'bold' }}>Tanggal Mulai </Text>
                                </View>
                                <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>:</Text>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        {tanggal.tgl_mulai} s.d {tanggal.tgl_akhir}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', borderBottomWidth:1 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, fontWeight: 'bold' }}>Jam </Text>
                                </View>
                                <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>:</Text>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        {tanggal.jam_mulai} s.d {tanggal.jam_akhir}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, fontWeight: 'bold' }}>
                                        Berkas yang Perlu di bawa
                                    </Text>
                                </View>
                                <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>:</Text>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        - Akta Kelahiran
                                    </Text>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        - Ijazah / SKHUN
                                    </Text>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        - Surat Kesehatan
                                    </Text>
                                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10 }}>
                                        - Berkas tambahan (sesuai dengan jalur pendaftaran yang diplih.)
                                    </Text>
                                </View>
                            </View>
                        </View>
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

export default DaftarUlang