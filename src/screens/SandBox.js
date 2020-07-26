import React, { useState, useEffect } from 'react'
import {
    Text,
    Alert,
    StyleSheet
} from 'react-native'

import {
    Picker
} from '@react-native-community/picker'
import { View, Label, Button } from 'native-base'
import { getProvinsi, getKota, getKecamatan, getDesa } from '../components/apimethod'
import Modal from 'react-native-modal'
const SandBox = () => {
    const [data, setData] = useState({
        'provinsi': '',
        'kabupaten': '',
        'kecamatan': '',
        'desa': ''
    })

    const [pickerEnable, setPickerEnable] = useState({
        'kabupaten': false,
        'kecamatan': false,
        'desa': false
    })
    const [dataSelected, setDataSelected] = useState({
        'provinsi': '',
        'kabupaten': '',
        'kecamatan': '',
        'desa': ''
    })

    const [dataProvinsi, setDataProvinsi] = useState([])
    const [dataKabupaten, setDataKabupaten] = useState([])
    const [dataKecamatan, setDataKecamatan] = useState([])
    const [dataDesa, setDataDesa] = useState([])
    const [modal, setModal] = useState(false)
    const takeProvinsi = async () => {
        const result = await getProvinsi()
        if (result.data) {
            setDataProvinsi(result.data)
        }
        else if (result.error) {
            Alert.alert('Kesalahan', 'Terjadi kesalahan, cek koneksi anda.')
        }
    }

    const takeKabupaten = async (id) => {
        if (id) {
            setDataKecamatan([])
            const result = await getKota(id)
            if (result.data) {
                setDataKabupaten(result.data)
            }
            else if (result.error) {
                Alert.alert('Kesalahan', 'Terjadi kesalahan, cek koneksi anda.')
            }
        }
    }

    const takeKecamatan = async (id) => {
        if (id) {
            const result = await getKecamatan(id)
            if (result.data) {
                setDataKecamatan(result.data)
            }
            else if (result.error) {
                Alert.alert('Kesalahan', 'Terjadi kesalahan, cek koneksi anda.')
            }
        }
    }

    const takeDesa = async (id) => {
        if (id) {
            const result = await getDesa(id)
            if (result.data) {
                setDataDesa(result.data)
            }
            else if (result.error) {
                Alert.alert('Kesalahan', 'Terjadi kesalahan, cek koneksi anda.')
            }
        }
    }

    const PickerProvinsi = () => {
        return (
            <>
                <Label>Provinsi</Label>
                <Picker
                    selectedValue={dataSelected.provinsi}
                    onValueChange={(value, index) => {
                        let val = dataProvinsi.find((data) => data.id === value)
                        setData({ ...data, ['provinsi']: val })
                        setDataSelected({ ...dataSelected, ['provinsi']: value })
                        takeKabupaten(value)
                        setPickerEnable({
                            ...pickerEnable,
                            ['kabupaten']: true,
                            ['kecamatan']: false,
                            ['desa']: false
                        })
                    }
                    }
                >
                    <Picker.Item label='Silahkan Pilih' value={0} />
                    {dataProvinsi.map((value, index) => {
                        return <Picker.Item label={value.nama} value={value.id} key={value.id} />
                    })}
                </Picker>
            </>
        )
    }

    const KabupatenPicker = ({ id }) => {
        return (
            <>
                <Label>Kabupaten</Label>
                <Picker
                    selectedValue={dataSelected.kabupaten}
                    onValueChange={(value, index) => {
                        let val = dataKabupaten.find((data) => data.id === value)
                        setData({ ...data, ['kabupaten']: val })
                        setDataSelected({ ...dataSelected, ['kabupaten']: value })
                        takeKecamatan(value)
                        setPickerEnable({
                            ...pickerEnable,
                            ['kecamatan']: true,
                            ['desa']: false
                        })
                    }
                    }
                    enabled={pickerEnable.kabupaten}
                >
                    <Picker.Item label='Silahkan Pilih' value={0} />
                    {dataKabupaten.map((value, index) => {
                        return <Picker.Item label={value.nama} value={value.id} key={value.id} />
                    })}

                </Picker>
            </>
        )
    }

    const KecamatanPicker = ({ id }) => {
        return (
            <>
                <Label>Kecamatan</Label>
                <Picker
                    selectedValue={dataSelected.kecamatan}
                    onValueChange={(value, index) => {
                        let val = dataKecamatan.find((data) => data.id === value)
                        setData({ ...data, ['kecamatan']: val })
                        setDataSelected({ ...dataSelected, ['kecamatan']: value })
                        takeDesa(value)
                        setPickerEnable({
                            ...pickerEnable,
                            ['desa']: true
                        })
                    }
                    }
                    enabled={pickerEnable.kecamatan}
                >
                    <Picker.Item label='Silahkan Pilih' value={0} />
                    {dataKecamatan.map((value, index) => {
                        return <Picker.Item label={value.nama} value={value.id} key={value.id} />
                    })}

                </Picker>
            </>
        )
    }

    const DesaPicker = ({ id }) => {
        return (
            <>
                <Label>Desa</Label>
                <Picker
                    selectedValue={dataSelected.desa}
                    onValueChange={(value, index) => {
                        let val = dataDesa.find((data) => data.id === value)
                        setData({ ...data, ['desa']: val })
                        setDataSelected({ ...dataSelected, ['desa']: value })
                    }
                    }
                    enabled={pickerEnable.desa}
                >
                    <Picker.Item label='Silahkan Pilih' value={0} />
                    {dataDesa.map((value, index) => {
                        return <Picker.Item label={value.nama} value={value.id} key={value.id} />
                    })}

                </Picker>
            </>
        )
    }

    useEffect(() => {
        // takeProvinsi()
    }, [])

    return (
        <>
            <View padder style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <PickerProvinsi />
                </View>
                <View style={{ flex: 1 }}>
                    <KabupatenPicker />
                </View>
            </View>
            <View padder style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <KecamatanPicker />
                </View>
                <View style={{ flex: 1 }}>
                    <DesaPicker />
                </View>
            </View>
            <Modal isVisible={modal}
                style={styles.modalView}
                onBackdropPress={() => setModal(false)}
            >
                <View style={{backgroundColor:'white', height:100, justifyContent:'flex-end'}}>
                    <Button
                        onPress={() => setModal(false)}
                    >
                        <Text>CLose Modal</Text>
                    </Button>
                </View>
            </Modal>
            <Button
                onPress={() => setModal(true)}
            >
                <Text>Open Modal</Text>
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        margin: 0
    }
})

export default SandBox