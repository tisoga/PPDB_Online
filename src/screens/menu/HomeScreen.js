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
    Right,
    Button,
    Content,
    Text,
    H3,
    H2
} from "native-base"
import { BackgroundHome } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    return (
        <>
            <Container>
                <ImageBackground
                    source={BackgroundHome}
                    style={styles.imageBackground}
                    imageStyle={{ resizeMode: 'stretch' }}
                >
                    <Header transparent style={{ height: 50, marginTop: 5 }}>
                        <Left style={{ flex: 1 }} />
                        <Body style={{ flex: 1 }}>
                            <Title style={{ alignSelf: 'center' }}>Home</Title>
                        </Body>
                        <Right style={{ flex: 1 }} />
                    </Header>
                    <Content>
                        <H3 style={styles.textOne}>Selamat Datang</H3>
                        <H3 style={styles.textTwo}>{userState.user.first_name + ' ' + userState.user.last_name}</H3>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('ProsesScreen')}
                            style={styles.boxOne}
                        >
                            <View style={{ flex: 1.3, justifyContent: 'center' }}>
                                <Icon name='reader' size={60} />
                            </View>
                            <View style={{ flex: 4, justifyContent: 'center' }}>
                                <H2>Proses Pendaftaran</H2>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', width: '79%', marginLeft: 40 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('CekKuotaScreen')}
                                style={styles.boxTwo}
                            >
                                <View style={{ flex: 3, alignItems: 'center' }}>
                                    <Icon name='book' size={60} />
                                </View>
                                <View style={{ flex: 1.5, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'black', textAlign:'center' }}>Cek Kuota Pendaftaraan</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('CekPengumuman')}
                                style={styles.boxThree}
                            >
                                <View style={{ flex: 3, alignItems: 'center' }}>
                                    <Icon name='information-circle' size={60} />
                                </View>
                                <View style={{ flex: 1.5, alignItems: 'center', backgroundColor: '#87ceeb', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'black', textAlign:'center' }}>Cek Pengumuman Penerimaan</Text>
                                </View>
                            </TouchableOpacity>
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
    textOne: {
        paddingLeft: 13,
        paddingTop: 10
    },
    textTwo: {
        color: 'white',
        paddingLeft: 30
    },
    boxOne: {
        height: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: 80,
        marginBottom: 10,
        marginHorizontal: 40,
        flexDirection: 'row'
    },
    boxTwo: {
        flex: 1,
        height: 110,
        backgroundColor: 'white',
        borderWidth: 1,
        marginRight: 10,
        marginLeft: -7
    },
    boxThree: {
        flex: 1,
        height: 110,
        backgroundColor: 'white',
        borderWidth: 1,
    }
})

export default HomeScreen