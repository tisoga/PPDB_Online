import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    ScrollView,
    FlatList,
    Alert
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
import { getMethod } from '../../components/apimethod';
import { baseUrl, eventsUrl } from '../../components/url';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../../redux/actions';
import moment from 'moment'
import { useAsyncStorage } from '@react-native-community/async-storage';

const EventScreen = () => {
    const userState = useSelector((state) => state.UserReducer)
    const data = useSelector((state) => state.EventsReducer)
    const [isRefresh, setRefresh] = useState(false)
    const dispatch = useDispatch()

    const ConvertDate = ({ date }) => {
        const tanggal = moment(date).format('DD')
        const bulan = moment(date).format('MM')
        const tahun = moment(date).format('YYYY')
        return (
            `  ${tanggal}\n  ${bulan}\n${tahun}`
        )
    }

    const refreshEvents = async () => {
        setRefresh(true)
        const urlNotifikasi = baseUrl + eventsUrl
        result = await getMethod(urlNotifikasi, userState.token)
        console.log(result.data)
        if (result.data) {
            dispatch(setEvents(result.data))
        }
        else {
            Alert.alert('Kesalahan', 'Harap Coba Beberapa Saat Lagi')
        }
        setRefresh(false)
    }

    const ListEvents = () => {
        if (data && data.length) {
            return (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => (
                        <View style={[styles.eventView, { marginTop: 15 }]}>
                            <View style={styles.tanggalView}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ alignSelf: 'center', borderBottomWidth: 1 }}>Start</Text>
                                    <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>
                                        <ConvertDate date={itemData.item.start_date} />
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.namaEventView}>
                                <ScrollView>
                                    <Text style={{ textAlign: 'justify', fontSize: 22 }}>
                                        {itemData.item.name}
                                    </Text>
                                </ScrollView>
                            </View>
                            <View style={styles.tanggalAkhirView}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ alignSelf: 'center', borderBottomWidth: 1 }}>End</Text>
                                    <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>
                                        <ConvertDate date={itemData.item.end_date} />
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )
        }
        else {
            return (
                <View style={styles.spinnerView}>
                    <Text style={styles.loadingText}>
                        Tidak Ada Kegiatan!
                    </Text>
                </View>
            )
        }
    }

    return (
        <>
            <Container style={styles.viewBackground}>
                <Header style={{ marginTop: 20 }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 1 }}>
                        <Title style={{ alignSelf: 'center' }}>List Kegiatan</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        <Button transparent
                            onPress={refreshEvents}
                        >
                            <Icon name='refresh-circle-outline' size={32} color={'white'} />
                        </Button>
                    </Right>
                </Header>
                {isRefresh
                    ?
                    <View style={styles.spinnerView}>
                        <Spinner size={80} color='white' />
                        <Text style={styles.loadingText}>
                            Mohon Tunggu ...
                            </Text>
                    </View>
                    :
                    <ListEvents />

                }
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    viewBackground: {
        backgroundColor: '#B7B7B7'
    },
    eventView: {
        borderWidth: 1,
        height: 120,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    tanggalView: {
        flex: 1,
        borderRightWidth: 1,
        backgroundColor: '#87ceeb'
    },
    tanggalAkhirView: {
        flex: 1,
        borderLeftWidth: 1,
        backgroundColor: '#87ceeb'
    },
    namaEventView: {
        flex: 3,
        padding: 15,
        justifyContent: 'center',
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

export default EventScreen