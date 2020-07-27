import React, { useState } from 'react'
import {
    StyleSheet,
    Dimensions,
    Image
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
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { Background } from '../../assets'

const src_height = Dimensions.get('window').height

const UploadBerkasScreen = ({ navigation, route }) => {
    const { title } = route.params
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
                            <Text style={styles.penjelasanText}>{title}</Text>
                        </View>
                    </View>
                </View>
                <Content padder>
                    <Card style={{ height: src_height - 300 }}>
                        <CardItem style={{ flex: 1, backgroundColor: '#87ceeb' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <ListItem>
                                    <Button style={{ borderRadius: 10 }}>
                                        <Text>Pilih File</Text>
                                    </Button>
                                    <Button style={{ borderRadius: 10, marginLeft: 10 }} success>
                                        <Text>Upload FIle</Text>
                                    </Button>
                                </ListItem>
                            </View>
                        </CardItem>
                        <CardItem style={{ backgroundColor: 'white', flex: 4 }}>
                            <Image
                                source={Background}
                                style={{ height: '100%', width: '100%', resizeMode: 'center' }}
                            />
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

export default UploadBerkasScreen