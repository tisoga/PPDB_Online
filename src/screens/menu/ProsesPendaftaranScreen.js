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
} from "native-base"
import { Background3 } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import ProgressCircle from 'react-native-progress-circle'
import { useSelector } from 'react-redux'

const ProsesPendaftaranScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)

    const StatusSiswa = () => {
        switch (userState.status) {
            case 0:
                status = 'Pelengkapan Identitas Diri';
                break;
            case 1:
                status = 'Pelengkapan Berkas-Berkas';
                break;
            case 2:
                status = 'Pengajuan Pendaftaran';
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                status = 'Sedang Diverifikasi';
                break;
        }
        return (
            <Text style={{ textAlign: 'center', fontSize: 23, fontStyle: 'italic' }}>
                {status}
            </Text>
        )
    }

    const PercentageCircle = () => {
        var status = 0;
        var text = '';
        switch (userState.status) {
            case 0:
                status = 0;
                text = '0%'
                break;
            case 1:
                status = 25;
                text = '25%';
                break;
            case 2:
                status = 50;
                text = '50%';
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                status = 75;
                text = '75%';
                break;
        }
        return (
            <ProgressCircle
                percent={status}
                radius={35}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
                outerCircleStyle={{ marginLeft: 10 }}
            >
                <Text style={{ fontSize: 18 }}>{text}</Text>
            </ProgressCircle>
        )
    }

    const RenderBox = () => {
        var box1 = ''
        var box2 = ''
        var box3 = ''
        var box4 = ''
        switch (userState.status) {
            case 0:
                box1 = styles.boxPrimary
                box2 = styles.boxSecondary
                box3 = styles.boxSecondary
                box4 = styles.boxSecondary
                break;
            case 1:
                box1 = styles.boxSucces
                box2 = styles.boxPrimary
                box3 = styles.boxSecondary
                box4 = styles.boxSecondary
                break;
            case 2:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxPrimary
                box4 = styles.boxSecondary
                break;
            case 3:
            case 10:
            case 11:
            case 12:
            case 13:
                box1 = styles.boxSucces
                box2 = styles.boxSucces
                box3 = styles.boxSucces
                box4 = styles.boxPrimary
                break;
        }
        return (
            <>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => console.log('2')}
                    style={box1}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='person' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pelengkapan Identitas Diri</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => console.log('2')}
                    style={box2}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='document' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pelengkapan Berkas-Berkas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => console.log('2')}
                    style={box3}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='clipboard' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Pengajuan Pendaftaran</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => console.log('2')}
                    style={box4}
                >
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='git-compare' size={40} color='white' />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: 'black' }}>Proses Daftar Ulang</Text>
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
                            <Title style={{ alignSelf: 'center' }}>Proses Pendaftaran</Title>
                        </Body>
                    </Header>
                    <Content>
                        <View style={styles.boxOne}>
                            <View style={styles.boxPercentage}>
                                <View style={{ flex: 1, marginTop: 23 }}>
                                    <PercentageCircle />
                                </View>
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'center' }}>Status Pendaftaran</Text>
                                    </View>
                                    <View style={{ flex: 4, flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20 }}>(</Text>
                                        </View>
                                        <View style={{ flex: 20 }}>
                                            <StatusSiswa />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20 }}>)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 2 }} />
                                </View>
                            </View>
                            <View style={styles.boxButton}>
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
    boxPercentage: {
        flex: 1,
        flexDirection: 'row',
    },
    boxButton: {
        flex: 2.4,
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    boxPrimary: {
        backgroundColor: '#0275d8',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30,
    },
    boxSecondary: {
        backgroundColor: '#868e96',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30
    },
    boxSucces: {
        backgroundColor: '#5cb85c',
        height: 90,
        width: '45%',
        marginLeft: 12,
        marginBottom: 30
    }
})

export default ProsesPendaftaranScreen