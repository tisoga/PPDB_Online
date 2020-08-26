import React, { useState, useEffect } from 'react'
import {
    StyleSheet, View, Alert
} from "react-native"

import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Tabs,
    Tab,
    ScrollableTab,
    Text
} from "native-base"
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import TabPengumuman from './TabPengumuman'
import ModalDetailPengumuman from './ModalDetailPengumuman'
import { getPengumuman, getSekolah } from '../../components/apimethod'
import { setPengumuman, setFormSekolah } from '../../redux/actions'

const CekPengumuman = ({ navigation }) => {
    const [modal, setModal] = useState(false)
    const [dataDetail, setDataDetail] = useState('')
    const dataPengumuman = useSelector((state) => state.PengumumanReducer)
    const sekolahState = useSelector((state) => state.SekolahReducer)
    // console.log(dataPengumuman)
    const dispatch = useDispatch()

    const getDataPengumuman = async () => {
        const result = await getPengumuman()
        if (result.data) {
            dispatch(setPengumuman(result.data))
            // console.log(result.data)
        }
        else if (result.error) {
            Alert.alert('Kesalaham', result.error)
        }
    }

    const getInfoSekolah = async () => {
        const result = await getSekolah()
        console.log(result.data)
        if (result.data) {
            dispatch(setFormSekolah(result.data))
        }
        else if (result.error) {
            Alert.alert('Kesalahan', result.error)
        }
    }

    useEffect(() => {
        getDataPengumuman();
        getInfoSekolah();
        console.log(sekolahState)
        // console.log(dataPengumuman)
    }, [])

    return (
        <>
            <Container>
                <Header style={{ marginTop: 20 }} hasTabs>
                    <Left style={{ flex: 1 }} >
                        <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                    </Left>
                    <Body style={{ flex: 12 }}>
                        <Title style={{ alignSelf: 'center' }}>Cek Pengumuman Penerimaan</Title>
                    </Body>
                </Header>
                {sekolahState.status_pendaftaran === 4
                    ?
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        <Tab heading="Zonasi">
                            <TabPengumuman
                                data={dataPengumuman.zonasi}
                                setModal={setModal}
                                dispatch={setDataDetail}
                            />
                        </Tab>
                        <Tab heading="Afirmasi">
                            <TabPengumuman
                                data={dataPengumuman.afirmasi}
                                setModal={setModal}
                                dispatch={setDataDetail}
                            />
                        </Tab>
                        <Tab heading="Perpindahan Orang Tua">
                            <TabPengumuman
                                data={dataPengumuman.perpindahan}
                                setModal={setModal}
                                dispatch={setDataDetail}
                            />
                        </Tab>
                        <Tab heading="Prestasi">
                            <TabPengumuman
                                data={dataPengumuman.prestasi}
                                setModal={setModal}
                                dispatch={setDataDetail}
                            />
                        </Tab>
                    </Tabs>
                    :
                    <View style={styles.viewPemberitahunan}>
                        <Text style={styles.textPemberitahuan}>Mohon Maaf, Pengumuman Penerimaan Pendaftaran Belum Tersedia.</Text>
                    </View>
                }
                <ModalDetailPengumuman isVisible={modal} setModal={setModal} data={dataDetail} />
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    viewModal: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        margin: 0,
        marginHorizontal: 10
    },
    viewPemberitahunan: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    textPemberitahuan: {
        textAlign: 'center',
        fontSize: 30,
        marginHorizontal: 10,
        color: '#87ceeb'
    }
})

export default CekPengumuman