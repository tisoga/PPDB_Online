import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    FlatList
} from 'react-native';

import {
    Container,
    Text,
    Spinner,
    Button,
    Header,
    Left,
    Body,
    Title,
    Right,
} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons'
import { Background2 } from '../../assets';
import { getMethod } from '../../components/apimethod';
import { baseUrl, notifikasiUrl } from '../../components/url';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifikasi } from '../../redux/actions';
import moment from 'moment';

const NotifikasiScreen = () => {
    const userState = useSelector((state) => state.UserReducer)
    const data = useSelector((state) => state.NotifikasiReducer)
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const ConvertDate = ({ date }) => {
        newDate = moment(date).format('DD/MM/YYYY')
        return newDate
    }

    const refreshNotifikasi = async () => {
        setLoading(true)
        const urlNotifikasi = baseUrl + notifikasiUrl
        result = await getMethod(urlNotifikasi, userState.token)
        if (result.data) {
            dispatch(setNotifikasi(result.data))
        }
        else if (result.error === 'Not found.') {
            dispatch(setNotifikasi([]))
        }
        else {
            Alert.alert('Kesalahan', 'Harap Coba Beberapa Saat Lagi')
        }
        setLoading(false)
    }

    const ListNotifikasi = () => {
        if (data && data.length) {
            return (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => (
                        <View style={styles.notifikasiView}>
                            <View>
                                <Text style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 5, color: 'white' }}>
                                    <ConvertDate date={itemData.item.tanggal_notifikasi} />
                                </Text>
                            </View>
                            <ScrollView style={{ paddingLeft: 15, paddingRight: 15 }}
                                nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                <Text style={{ textAlign: 'justify', fontSize: 25 }}>
                                    {itemData.item.notifikasi}
                                </Text>
                            </ScrollView>
                        </View>
                    )}
                />
                
            )
        }
        else {
            return (
                <View style={styles.spinnerView}>
                    <Text style={styles.loadingText}>
                        Tidak Ada Notifikasi
                    </Text>
                </View>
            )
        }
    }

    return (
        <>
            <Container>
                <ImageBackground
                    source={Background2}
                    style={styles.imageBackground}
                >
                    <Header transparent>
                        <Left style={{ flex: 1 }} />
                        <Body style={{ flex: 1 }}>
                            <Title style={{ alignSelf: 'center' }}>Notifikasi</Title>
                        </Body>
                        <Right style={{ flex: 1 }} >
                            <Button transparent
                                onPress={refreshNotifikasi}
                            >
                                <Icon name='refresh-circle-outline' size={32} color={'white'} />
                            </Button>
                        </Right>
                    </Header>
                    {isLoading
                        ?
                        <View style={styles.spinnerView}>
                            <Spinner size={80} color='white' />
                            <Text style={styles.loadingText}>
                                Mohon Tunggu ...
                            </Text>
                        </View>
                        : <ListNotifikasi />
                    }
                </ImageBackground>
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
    notifikasiView: {
        borderWidth: 1,
        height: 120,
        borderRadius: 25,
        marginBottom: 20,
        marginLeft: 37,
        marginRight: 37,
        backgroundColor: 'rgba(220,220,220,0.5)',
        elevation: 5
    },
    spinnerView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        alignSelf: 'center',
        color: 'white',
        marginTop: 10,
        fontSize: 20
    }
});

export default NotifikasiScreen