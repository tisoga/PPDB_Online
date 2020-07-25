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
    Picker,
    Button,
    DatePicker
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import { setIdentiasForm } from '../../redux/actions'
import { AlamatPicker } from './form/'
import { isObjectsEmpty } from '../../components/others'
import { putMethod } from '../../components/apimethod'
import { baseUrl, profileUrl } from '../../components/url'

const PelengkapanIdentitas = ({ navigation }) => {
    const formData = useSelector((state) => state.IdentitasFormReducer)
    const userState = useSelector((state) => state.UserReducer)
    const [fileName, setFileName] = useState('')
    const dispatch = useDispatch()

    const selectFotoDiri = async () => {
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
                dispatch(setIdentiasForm('foto_diri', {
                    name: response.fileName,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                    type: response.type
                }))
                setFileName(response.fileName)
            }
            console.log(formData.foto_diri)
        });
    }

    useEffect(() => {
        dispatch(setIdentiasForm('first_name', userState.user.first_name))
        dispatch(setIdentiasForm('last_name', userState.user.last_name))
    }, [])

    const saveButton = async () => {
        let sendData = new FormData();
        const url = baseUrl + profileUrl
        // console.log(alamat_lengkap)
        if (isObjectsEmpty(formData)) {
            const tanggal_lahir = formData.tanggal_lahir.getFullYear() + '-'
                + formData.tanggal_lahir.getMonth() + '-'
                + formData.tanggal_lahir.getDate();
            const alamat_lengkap = formData.alamat + ', ' + formData.provinsi + ', ' + formData.kota + ', ' +
                formData.kecamatan + ', ' + formData.desa;
            sendData.append('first_name', formData.first_name);
            sendData.append('last_name', formData.last_name);
            sendData.append('tanggal_lahir', tanggal_lahir);
            sendData.append('jenis_kelamin', 'L');
            sendData.append('tempat_lahir', formData.tempat_lahir);
            sendData.append('umur', formData.umur);
            sendData.append('alamat', alamat_lengkap);
            sendData.append('foto_diri', formData.foto_diri);
            const result = await putMethod(url, sendData, userState.token)
            console.log(result)
            if (result.data) {
                Alert.alert('Berhasil', 'Pelengkapan Identitas Berhasil!')
            }
            else if (result.error) {
                Alert.alert('Kesalahan', result.error)
            }
        }
        else {
            Alert.alert('Kesalahan', 'Harap Lengkapi Seluruh Form, Terlebih Dahulu.')
        }
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
                    <H3 style={{ marginTop: 35, color: 'white' }}>Pelengkapan Identitas</H3>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon name='person' size={100} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={styles.penjelasanText}>
                                Pada proses ini, Calon siswa  melengkapi identitas data dirinya seperti :
                                Tanggal Lahir, Tempat Lahir, Umur, Alamat Lengkap, dan juga Foto Diri.
                            </Text>
                        </View>
                    </View>
                </View>
                <Form>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Depan</Label>
                                <Input
                                    value={formData.first_name}
                                    onChangeText={(val) => dispatch(setIdentiasForm('first_name', val))} />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Belakang</Label>
                                <Input
                                    value={formData.last_name}
                                    onChangeText={(val) => dispatch(setIdentiasForm('last_name', val))} />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Label>Jenis Kelamin</Label>
                        <Item style={{ borderBottomColor: '#24d169' }} picker>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined }}
                                placeholder="Pilih Jenis Kelamain"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={formData.jenis_kelamin}
                                onValueChange={(val) => dispatch(setIdentiasForm('jenis_kelamin', val))}
                            >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                            </Picker>
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
                                    onDateChange={(value) => dispatch(setIdentiasForm('tanggal_lahir', value))}
                                >
                                </DatePicker>
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1.2 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Tempat Lahir</Label>
                                <Input onChangeText={(val) => dispatch(setIdentiasForm('tempat_lahir', val))} />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 0.6 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Umur</Label>
                                <Input onChangeText={(val) => dispatch(setIdentiasForm('umur', val))} />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Alamat</Label>
                            <Input multiline={true} numberOfLines={3} onChangeText={(val) => dispatch(setIdentiasForm('alamat', val))} />
                        </Item>
                    </View>

                    <AlamatPicker />

                    <View padder>
                        <Item inlineLabel>
                            <Left>
                                <Label>Foto Diri</Label>
                                <Text>{fileName}</Text>
                            </Left>
                            <Right>
                                <Button rounded onPress={selectFotoDiri}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                    </View>
                    <View>
                        <Button full
                            onPress={() => saveButton()}
                        >
                            <Text>Simpan</Text>
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

export default PelengkapanIdentitas