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
    Picker,
    DatePicker,
    Spinner
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import { setFormPengajuan, setUserLogin, setUserToken } from '../../redux/actions'
import { AlamatPicker } from './form'
import { isObjectsEmpty, nilaiValidation } from '../../components/others'
import { patchMethod } from '../../components/apimethod'
import { baseUrl, pengajuanUrl } from '../../components/url'

const EditPengajuanScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    const formData = useSelector((state) => state.PengajuanFormReducer)
    const [isLoading, setLoading] = useState(false)
    const [alamat, setAlamat] = useState()
    const dispatch = useDispatch()

    const saveButton = async () => {
        let sendData = new FormData();
        const url = baseUrl + pengajuanUrl
        delete formData['asal_sekolah']
        delete formData['berkas_tambahan']
        if (!Number.isFinite(parseFloat(formData.nilai_matematika) && parseFloat(formData.nilai_indonesia)
            && parseFloat(formData.nilai_inggris) && parseFloat(formData.nilai_ipa))) {
            Alert.alert('Kesalahan', 'Harap Masukan angka saja didalam Form Nilai UN')
        }
        else if (!nilaiValidation(formData.nilai_indonesia, formData.nilai_matematika,
            formData.nilai_inggris, formData.nilai_ipa)) {
            Alert.alert('Kesalahan', 'Angka untuk Nilai UN Tidak boleh lebih dari 100 atau kurang dari 0')
        }
        else if (isObjectsEmpty(formData)) {
            setLoading(true)
            const tanggal_lahir = formData.tanggal_lahir.getFullYear() + '-'
                + formData.tanggal_lahir.getMonth() + '-'
                + formData.tanggal_lahir.getDate();
            const alamat_lengkap = formData.alamat + ', ' + formData.desa + ', ' + formData.kecamatan + ', ' +
                formData.kota + ', ' + formData.provinsi;
            sendData.append('first_name', formData.first_name);
            sendData.append('last_name', formData.last_name);
            sendData.append('tanggal_lahir', tanggal_lahir);
            sendData.append('jenis_kelamin', formData.jenis_kelamin);
            sendData.append('tempat_lahir', formData.tempat_lahir);
            sendData.append('umur', formData.umur);
            sendData.append('alamat', alamat_lengkap);
            sendData.append('nilai_indonesia', parseFloat(formData.nilai_indonesia));
            sendData.append('nilai_matematika', parseFloat(formData.nilai_matematika));
            sendData.append('nilai_ipa', parseFloat(formData.nilai_ipa));
            sendData.append('nilai_inggris', parseFloat(formData.nilai_inggris));
            const result = await patchMethod(url, sendData, userState.token)
            // console.log(result)
            if (result.data) {
                Alert.alert('Berhasil', 'Perubahan Identitas Berhasil!', [
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
            else {
                Alert.alert('Kesalahan', 'Harap Lengkapi Seluruh Form, Terlebih Dahulu.')
            }
            setLoading(false)
        }
        else {
            Alert.alert('Kesalahan', 'Harap Lengkapi Seluruh Form Terlebih Dahulu.')
        }
    }


    useEffect(() => {
        dispatch(setFormPengajuan('provinsi', ''))
        dispatch(setFormPengajuan('kota', ''))
        dispatch(setFormPengajuan('kecamatan', ''))
        dispatch(setFormPengajuan('desa', ''))
        dispatch(setFormPengajuan('tanggal_lahir', ''))
        const split_alamat = formData.alamat.split(',')
        dispatch(setFormPengajuan('alamat', split_alamat[0]))
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
                                <Input multiline={true} numberOfLines={2} value={formData.first_name}
                                    onChangeText={(val) => dispatch(setFormPengajuan('first_name', val))}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Belakang</Label>
                                <Input multiline={true} numberOfLines={2} value={formData.last_name}
                                    onChangeText={(val) => dispatch(setFormPengajuan('last_name', val))}
                                />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Jenis Kelamin</Label>
                            <Item style={{ borderBottomColor: '#24d169' }} picker>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: undefined }}
                                    placeholder="Pilih Jenis Kelamain"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={formData.jenis_kelamin}
                                    onValueChange={(val) => dispatch(setFormPengajuan('jenis_kelamin', val))}
                                >
                                    <Picker.Item label="Laki-Laki" value="L" />
                                    <Picker.Item label="Perempuan" value="P" />
                                </Picker>
                            </Item>
                        </Item>
                    </View>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label style={{ marginBottom: 9 }}>Tanggal Lahir</Label>
                                <DatePicker
                                    defaultDate={new Date()}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    disabled={false}
                                    multiline={true}
                                    numberOfLines={2}
                                    onDateChange={(value) => dispatch(setFormPengajuan('tanggal_lahir', value))}
                                >
                                </DatePicker>
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1.2 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Tempat Lahir</Label>
                                <Input value={formData.tempat_lahir}
                                    editable={true} onChangeText={(val) => {
                                        dispatch(setFormPengajuan('tempat_lahir', val))
                                    }}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 0.6 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Umur</Label>
                                <Input value={formData.umur.toString()}
                                    editable={true} onChangeText={(val) => {
                                        dispatch(setFormPengajuan('umur', val))
                                    }}
                                />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Alamat</Label>
                            <Input multiline={true} numberOfLines={3} value={formData.alamat}
                                editable={true} onChangeText={(val) => {
                                    dispatch(setFormPengajuan('alamat', val))
                                }}
                            />
                        </Item>
                    </View>
                    <AlamatPicker />
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Nilai-Nilai UN</H3>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Indonesia</Label>
                                    <Input value={formData.nilai_indonesia.toString()} keyboardType={"numeric"}
                                        editable={true} onChangeText={(val) => {
                                            dispatch(setFormPengajuan('nilai_indonesia', val))
                                        }}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Inggris</Label>
                                    <Input value={formData.nilai_inggris.toString()}
                                        editable={true} onChangeText={(val) => {
                                            dispatch(setFormPengajuan('nilai_inggris', val))
                                        }}
                                    />
                                </View>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Matematika</Label>
                                    <Input value={formData.nilai_matematika.toString()}
                                        editable={true} onChangeText={(val) => {
                                            dispatch(setFormPengajuan('nilai_matematika', val))
                                        }}
                                    />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>IPA</Label>
                                    <Input value={formData.nilai_ipa.toString()}
                                        editable={true} onChangeText={(val) => {
                                            dispatch(setFormPengajuan('nilai_ipa', val))
                                        }}
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
                        onPress={() => saveButton()}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? <Spinner color='white' />
                            : <Text style={{ textAlign: 'center' }}>Simpan</Text>}
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