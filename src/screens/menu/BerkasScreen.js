import React, { useState } from 'react'
import {
    StyleSheet
} from 'react-native'
import {
    Header,
    Container,
    Left,
    Content,
    H3,
    View,
    Text,
    Item,
    Label,
    Input,
    Button,
    Card,
    CardItem,
    Body,
    Right,
    ListItem,
    CheckBox
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'

const BerkasScreen = ({ navigation }) => {
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
                            <View style={{ flex: 1 }}>
                                <ListItem>
                                    <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                    <CheckBox checked={true} color="green" />
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info>
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            <Button full style={{ flex: 1 }} success>
                                <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Akta Kelahiran</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ListItem>
                                    <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                    <CheckBox checked={true} color="green" />
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info>
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            <Button full style={{ flex: 1 }} success>
                                <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>SKHUN / Ijazah</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ListItem>
                                    <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                    <CheckBox checked={true} color="green" />
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info>
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            <Button full style={{ flex: 1 }} success>
                                <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Surat Kesehatan</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ListItem>
                                    <Text style={{ marginRight: 10 }}>Ganti Dokumen</Text>
                                    <CheckBox checked={true} color="green" />
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Button full style={{ flex: 1 }} info>
                                <Text>Lihat Dokumen</Text>
                            </Button>
                            <Button full style={{ flex: 1 }} success>
                                <Text style={{ textAlign: 'center' }}>Upload Dokumen</Text>
                            </Button>
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