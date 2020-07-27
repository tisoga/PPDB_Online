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

const EditPengajuanScreen = ({ navigation }) => {
    const formData = useSelector((state) => state.PengajuanFormReducer)

    const JenisKelamin = () => {
        if (useState.jenis_kelamin) {
            return (
                <Input value='Laki-Laki' editable={true} />
            )
        }
        else {
            return (
                <Input value='Perempuan' editable={true} />
            )
        }
    }

    const TanggalLahir = () => {
        const newDate = moment(formData.tanggal_lahir).format('DD/MM/YYYY')
        return (
            <Input value={newDate} editable={true} />
        )
    }

    useEffect(() => {
        
    }, [])

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
                                <Input multiline={true} numberOfLines={2} value={formData.user.first_name}
                                    editable={true}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Belakang</Label>
                                <Input multiline={true} numberOfLines={2} value={formData.user.last_name}
                                    editable={true}
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
                                <Input value={formData.tempat_lahir}
                                    editable={true}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 0.6 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Umur</Label>
                                <Input value={formData.umur.toString()}
                                    editable={true}
                                />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Alamat</Label>
                            <Input multiline={true} numberOfLines={3} value={formData.alamat}
                                editable={true}
                            />
                        </Item>
                    </View>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Nilai-Nilai UN</H3>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Indonesia</Label>
                                    <Input value={formData.nilai_indonesia.toString()}
                                        editable={true}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Inggris</Label>
                                    <Input value={formData.nilai_inggris.toString()}
                                        editable={true}
                                    />
                                </View>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Matematika</Label>
                                    <Input value={formData.nilai_matematika.toString()}
                                        editable={true}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>IPA</Label>
                                    <Input value={formData.nilai_ipa.toString()}
                                        editable={true}
                                    />
                                </View>
                            </Item>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Berkas-Berkas</H3>
                        <Item>
                            <Button full style={{ flex: 1 }}
                                onPress={() => navigation.navigate('BerkasScreen', {
                                    edit: true
                                })}
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
                    <Button full success
                        onPress={() => console.log('Simpan')}
                    >
                        <Text style={{ textAlign: 'center' }}>Simpan</Text>
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

export default EditPengajuanScreen