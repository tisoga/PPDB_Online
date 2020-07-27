import React, { useState } from 'react'
import {
    StyleSheet
} from 'react-native'
import {
    Header,
    Container,
    Left,
    Content,
    View,
    Text,
    Button,
    Card,
    CardItem,
    ListItem,
    CheckBox
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'

const BerkasScreen = ({ navigation, route }) => {
    const userState = useSelector((state) => state.UserReducer)
    const { edit } = route.params;
    const [isChecked, setChecked] = useState({
        fotoDiri: false,
        akta: false,
        ijazah: false,
        kesehatan: false
    })

    return (
        <Container style={{ backgroundColor: '#B7B7B7' }}>
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
            </Header>
            <Content>
                <View padder style={[styles.headerColor, { height: 130 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name='cloud-upload' size={80} color={'white'} style={{ marginTop: 10 }} />
                        <View style={{ flexDirection: 'column', marginTop: 20, marginLeft: 10 }}>
                            <Text style={styles.penjelasanText}>Upload</Text>
                            <Text style={styles.penjelasanText}>Berkas-Berkas</Text>
                        </View>
                    </View>
                </View>
                <Content padder>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Foto Diri</Text>
                            </View>
                            {edit &&
                                <View style={{ flex: 1 }}>
                                    <ListItem>
                                        <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                        <CheckBox checked={isChecked.fotoDiri} color="green"
                                            onPress={() => setChecked({ ...isChecked, ['fotoDiri']: !isChecked.fotoDiri })}
                                        />
                                    </ListItem>
                                </View>
                            }
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info
                                onPress={() => navigation.navigate('LihatDokumenScreen', {
                                    title: 'Foto Diri',
                                    berkas: userState.foto_diri
                                })}
                            >
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            {isChecked.fotoDiri &&
                                <Button full style={{ flex: 1 }} success
                                    onPress={() => navigation.navigate('UploadBerkasScreen', {
                                        title: 'Foto Diri'
                                    })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                                </Button>
                            }
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Akta Kelahiran</Text>
                            </View>
                            {edit &&
                                <View style={{ flex: 1 }}>
                                    <ListItem>
                                        <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                        <CheckBox checked={isChecked.akta} color="green"
                                            onPress={() => setChecked({ ...isChecked, ['akta']: !isChecked.akta })}
                                        />
                                    </ListItem>
                                </View>
                            }
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info
                                onPress={() => navigation.navigate('LihatDokumenScreen', {
                                    title: 'Akta Kelahiran',
                                    berkas: userState.berkas_akta
                                })}
                            >
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            {isChecked.akta &&
                                <Button full style={{ flex: 1 }} success
                                    onPress={() => navigation.navigate('UploadBerkasScreen', {
                                        title: 'Akta Kelahiran'
                                    })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                                </Button>
                            }
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>SKHUN / Ijazah</Text>
                            </View>
                            {edit &&
                                <View style={{ flex: 1 }}>
                                    <ListItem>
                                        <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                        <CheckBox checked={isChecked.ijazah} color="green"
                                            onPress={() => setChecked({ ...isChecked, ['ijazah']: !isChecked.ijazah })}
                                        />
                                    </ListItem>
                                </View>
                            }
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info
                                onPress={() => navigation.navigate('LihatDokumenScreen', {
                                    title: 'SKHUN / Ijazah',
                                    berkas: userState.berkas_ijazah
                                })}
                            >
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            {isChecked.ijazah &&
                                <Button full style={{ flex: 1 }} success
                                    onPress={() => navigation.navigate('UploadBerkasScreen', {
                                        title: 'SKHUN / Ijazah'
                                    })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                                </Button>
                            }
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Surat Kesehatan</Text>
                            </View>
                            {edit &&
                                <View style={{ flex: 1 }}>
                                    <ListItem>
                                        <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                        <CheckBox checked={isChecked.kesehatan} color="green"
                                            onPress={() => setChecked({ ...isChecked, ['kesehatan']: !isChecked.kesehatan })}
                                        />
                                    </ListItem>
                                </View>
                            }
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info
                                onPress={() => navigation.navigate('LihatDokumenScreen', {
                                    title: 'Surat Kesehatan',
                                    berkas: userState.berkas_kesehatan
                                })}
                            >
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            {isChecked.kesehatan &&
                                <Button full style={{ flex: 1 }} success
                                    onPress={() => navigation.navigate('UploadBerkasScreen', {
                                        title: 'Surat Kesehatan'
                                    })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                                </Button>
                            }
                        </CardItem>
                    </Card>
                </Content>
            </Content>
        </Container >
    )
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: '#0275d8'
    },
    penjelasanText: {
        flexWrap: 'wrap',
        textAlign: 'justify',
        color: 'white',
        fontSize: 20
    }
})

export default BerkasScreen