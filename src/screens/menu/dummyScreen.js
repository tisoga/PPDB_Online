import React, { useState } from 'react'
import {
    StyleSheet
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
import DocumentPicker from 'react-native-document-picker'

const PelengkapanBerkas = () => {
    const [foto, setFoto] = useState('')
    const [date, setDate] = useState({ chosenDate: '' })
    const [fileName, setFileName] = useState('')

    const selectFotoDiri = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            setFoto(res)
            setFileName(res.name)
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }
    return (
        <Container>
            <Header style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Pengajuan Pendaftaran</Title>
                </Body>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 200 }]}>
                    <H3 style={{ marginTop: 35, color: 'white' }}>Pengajuan Pendaftaran</H3>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon name='document' size={100} color={'white'} style={{ marginTop: 10 }} />
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
                                <Input />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Nama Belakang</Label>
                                <Input />
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
                                    onDateChange={(value) => setDate(value)}
                                >
                                </DatePicker>
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 1.2 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Tempat Lahir</Label>
                                <Input />
                            </Item>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 0.6 }}>
                            <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                                <Label>Umur</Label>
                                <Input />
                            </Item>
                        </View>
                    </View>
                    <View padder>
                        <Item style={{ borderBottomColor: '#24d169' }} stackedLabel>
                            <Label>Alamat</Label>
                            <Input multiline={true} numberOfLines={3} />
                        </Item>
                    </View>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Label>Provinsi</Label>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined }}
                                placeholder="Pilih Jenis Kelamain"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                            </Picker>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Label>Kabupaten/Kota</Label>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined }}
                                placeholder="Pilih Jenis Kelamain"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                            </Picker>
                        </View>
                    </View>
                    <View padder style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Label>Kecamatan</Label>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined }}
                                placeholder="Pilih Jenis Kelamain"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                            </Picker>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Label>Desa</Label>
                            <Picker
                                enabled={false}
                                mode="dropdown"
                                style={{ width: undefined }}
                                placeholder="Pilih Jenis Kelamain"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Nilai-Nilai UN</H3>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Indonesia</Label>
                                    <Input />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Bahasa Inggris</Label>
                                    <Input />
                                </View>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>Matematika</Label>
                                    <Input />
                                </View>
                            </Item>
                            <Item inlineLabel style={{ width: '40%', borderBottomColor: '#24d169' }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Label>IPA</Label>
                                    <Input />
                                </View>
                            </Item>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, margin: 10 }}>
                        <H3 style={{ textAlign: 'center', backgroundColor: '#87ceeb' }}>Upload File</H3>
                        <Item inlineLabel>
                            <Left>
                                <Label>Ijazah / SKHUN</Label>
                                <Text>{fileName}</Text>
                            </Left>
                            <Right>
                                <Button onPress={selectFotoDiri}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                        <Item inlineLabel style={{ marginTop: 5 }}>
                            <Left>
                                <Label>Akta Kelahiran</Label>
                                <Text>{fileName}</Text>
                            </Left>
                            <Right>
                                <Button onPress={selectFotoDiri}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                        <Item inlineLabel style={{ marginTop: 5 }}>
                            <Left>
                                <Label>Surat Kesehatan</Label>
                                <Text>{fileName}</Text>
                            </Left>
                            <Right>
                                <Button onPress={selectFotoDiri}>
                                    <Text>Pilih File</Text>
                                </Button>
                            </Right>
                        </Item>
                    </View>
                    <View>
                        <Button full>
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

export default PelengkapanBerkas