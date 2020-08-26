import React from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from "react-native"
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Content,
    Text,
    Right,
    Thumbnail,
    ListItem,
    H3,
    List,
} from "native-base"
import { ProfileImage } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { baseUrl, logoutUrl, mediaUrl } from '../../components/url'
import { postMethod } from '../../components/apimethod'
import AsyncStorage from '@react-native-community/async-storage'
import { setIsSigned, setWelcome, resetIdentitasForm } from '../../redux/actions'

const ProfileScreen = ({ navigation }) => {
    const userState = useSelector((state) => state.UserReducer)
    console.log(userState)
    const dispatch = useDispatch()
    // console.log(userState)

    const ConvertDate = () => {
        if (userState.tanggal_lahir) {
            newDate = moment(userState.tanggal_lahir).format('DD/MM/YYYY')
            return (
                <H3>
                    {newDate}
                </H3>
            )
        }
        else {
            return (<H3>Belum di Isi.</H3>)
        }

    }

    const FotoDiri = () => {
        // console.log(mediaUrl + userState.foto_diri)
        if (userState.foto_diri) {
            return (
                <Thumbnail large source={{ uri: mediaUrl + userState.foto_diri }} style={{ alignSelf: 'center' }} />
            )
        }
        else {
            return (
                <Thumbnail large source={ProfileImage} style={{ alignSelf: 'center' }} />
            )
        }
    }

    const JenisKelamin = () => {
        if (userState.jenis_kelamin) {
            var jk = ''
            switch (userState.jenis_kelamin) {
                case 'L':
                    jk = 'Laki-Laki'
                    break;
                case 'P':
                    jk = 'Perempuan'
            }
            return (
                <H3>{jk}</H3>
            )
        }
        else {
            return (
                <H3>Belum di isi.</H3>
            )
        }
    }

    const StatusPendaftaran = () => {
        let jalur = ''
        switch (userState.status) {
            case 10:
                jalur = 'Jalur Zonasi'
                break;
            case 11:
                jalur = 'Jalur Afirmasi'
                break
            case 12:
                jalur = 'Jalur Perpindahan Orang Tua'
                break
            case 13:
                jalur = 'Jalur Prestasi'
                break
            default:
                jalur = 'Belum dipilih'
                break;
        }
        return (
            <H3>{jalur}</H3>
        )
    }

    const logoutUser = async () => {
        const url = baseUrl + logoutUrl
        const result = await postMethod(url, '', userState.token)
        if (result.error) {
            Alert.alert('Kesalahan', 'Terjadi kesalahan, Silahkan Coba lagi.')
        }
        else {
            await AsyncStorage.removeItem('@authToken')
            dispatch(setIsSigned(false))
            dispatch(setWelcome(true))
            Alert.alert('Peringatan', 'Logout Berhasil.')
        }
    }
    const logout = () => {
        Alert.alert('Warning', 'Apakah Anda Yakin Ingin Logout', [
            { text: 'Tidak', style: 'cancel' },
            { text: 'Ya', onPress: () => logoutUser() }
        ], { cancelable: false })
    }



    return (
        <>
            <Container>
                <Header style={{ marginTop: 20 }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 1 }}>
                        <Title style={{ alignSelf: 'center' }}>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ marginTop: 10 }}>
                        <FotoDiri />
                        <View style={styles.profileList}>
                            <View style={styles.viewLeft}>
                                <H3>NIM</H3>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Text>:</Text>
                            </View>
                            <View style={styles.viewRight}>
                                <H3>{userState.nis}</H3>
                            </View>
                        </View>
                        <View style={styles.profileList}>
                            <View style={styles.viewLeft}>
                                <H3>Nama Lengkap</H3>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Text>:</Text>
                            </View>
                            <View style={styles.viewRight}>
                                <H3>{userState.user.first_name + ' ' + userState.user.last_name}</H3>
                            </View>
                        </View>
                        <View style={styles.profileList}>
                            <View style={styles.viewLeft}>
                                <H3>Jenis Kelamin</H3>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Text>:</Text>
                            </View>
                            <View style={styles.viewRight}>
                                <JenisKelamin />
                            </View>
                        </View>
                        <View style={styles.profileList}>
                            <View style={styles.viewLeft}>
                                <H3>Tanggal Lahir</H3>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Text>:</Text>
                            </View>
                            <View style={styles.viewRight}>
                                <ConvertDate />
                            </View>
                        </View>
                        <View style={styles.profileList}>
                            <View style={styles.viewLeft}>
                                <H3>Jalur Pendaftaran </H3>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Text>:</Text>
                            </View>
                            <View style={styles.viewRight}>
                                <StatusPendaftaran />
                            </View>
                        </View>
                        <ListItem itemDivider style={{ marginTop: 10 }} />
                        <List>
                            <ListItem onPress={() => navigation.navigate('GantiPasswordScreen')}>
                                <Left>
                                    <Icon name='key' size={20} color={'tomato'} />
                                    <Text style={styles.textLeft}>Ganti Password</Text>
                                </Left>
                                <Right>
                                    <Icon name='arrow-forward' size={20} color={'tomato'} />
                                </Right>
                            </ListItem>
                            <ListItem onPress={logout}>
                                <Left>
                                    <Icon name='log-out' size={20} color={'tomato'} />
                                    <Text style={styles.textLeft}>Log Out</Text>
                                </Left>
                                <Right>
                                    <Icon name='arrow-forward' size={20} color={'tomato'} />
                                </Right>
                            </ListItem>
                        </List>
                        <ListItem itemDivider style={{ marginTop: 10 }} />
                    </View>
                </Content>
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
    profileList: {
        flexDirection: 'row',
        marginTop: 25,
    },
    viewLeft: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    viewMiddle: {
        flex: 0.1,
        alignItems: 'center',
    },
    viewRight: {
        flex: 1,
        alignItems: 'flex-start',
    },
    textLeft: {
        marginLeft: 10
    }
})

export default ProfileScreen