import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Alert
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
    Item,
    Label,
    Input,
    Button,
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import moment from 'moment'

const PengajuanPendaftaran = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)

    const JenisKelamin = () => {
        if (useState.jenis_kelamin) {
            return (
                <Input value='Laki-Laki' editable={false} />
            )
        }
        else {
            return (
                <Input value='Perempuan' editable={false} />
            )
        }
    }

    const TanggalLahir = () => {
        const newDate = moment(userState.tanggal_lahir).format('DD/MM/YYYY')
        return (
            <Input value={newDate} editable={false} />
        )
    }

    useEffect(() => {
        Alert.alert('Perhatian', 'Harap Pastikan Kembali Data-Data Anda Sebelum Mengirimkan Pengajuan. \nDikarenkan Jika Anda Sudah Mengirimkan Pengajuan, Anda Tidak Dapat Merubah Kembali Data Anda.')
    },[])

    return (
        <Container>
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Pengajuan Pendaftaran</Title>
                </Body>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 200 }]}>
                    <H3 style={{ marginTop: 26, color: 'white' }}>Pengajuan Pendaftaran</H3>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon name='clipboard' size={100} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={styles.penjelasanText}>
                                Pada proses ini, calon siswa diharapkan kembali mencheck kembali identitas diri
                                dan berkas-berkas. jika sudah silahkan memilih jalur pendaftaran.
                            </Text>
                        </View>
                    </View>
                </View>
                <Form>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Depan</Label>
                                <Input multiline={true} numberOfLines={2} value={userState.user.first_name}
                                    editable={false}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Belakang</Label>
                                <Input multiline={true} numberOfLines={2} value={userState.user.last_name}
                                    editable={false}
                                />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Jenis Kelamin</Label>
                            <JenisKelamin />
                        </Item>
                    </View>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Tanggal Lahir</Label>
                                <TanggalLahir />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1.2 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Tempat Lahir</Label>
                                <Input value={userState.tempat_lahir}
                                    editable={false}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 0.6 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Umur</Label>
                                <Input value={userState.umur.toString()}
                                    editable={false}
                                />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Alamat</Label>
                            <Input multiline={true} numberOfLines={3} value={userState.alamat}
                                editable={false}
                            />
                        </Item>
                    </View>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Nilai-Nilai UN</H3>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Indonesia</Label>
                                    <Input value={userState.nilai_indonesia.toString()}
                                        editable={false}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Inggris</Label>
                                    <Input value={userState.nilai_inggris.toString()}
                                        editable={false}
                                    />
                                </View>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Matematika</Label>
                                    <Input value={userState.nilai_matematika.toString()}
                                        editable={false}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>IPA</Label>
                                    <Input value={userState.nilai_ipa.toString()}
                                        editable={false}
                                    />
                                </View>
                            </Item>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Berkas-Berkas</H3>
                        <Item>
                            <Button full style={{ flex: 1 }}
                                onPress={() => navigation.navigate('BerkasScreen')}
                            >
                                <Text>Cek Berkas</Text>
                            </Button>
                        </Item>
                    </View>
                    <View></View>
                </Form>
            </Content>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Button full success>
                        <Text>Edit</Text>
                    </Button>
                </View>
                <View style={{ flex: 1 }}>
                    <Button full
                        onPress={() => navigation.navigate('PilihJalurScreen')}
                    >
                        <Text style={{ textAlign: 'center' }}>Pilih Jalur Pendaftaran</Text>
                    </Button>
                </View>
            </View>
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

export default PengajuanPendaftaran