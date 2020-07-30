import React, { useState, useEffect } from 'react'
import {
    Text,
    Alert
} from 'react-native'

import {
    Picker
} from '@react-native-community/picker'
import { View, Label } from 'native-base'
import { getProvinsi, getKota, getKecamatan, getDesa } from '../../../components/apimethod'
import { setIdentiasForm, setFormPengajuan } from '../../../redux/actions'
import { useDispatch } from 'react-redux'

const AlamatPicker = ({ screen }) => {
    const dispatch = useDispatch()
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
            setDataDesa([])
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
            setDataDesa([])
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
                        if (value) {
                            let val = dataProvinsi.find((data) => data.id === value)
                            if (screen === 'identitas'){
                                dispatch(setIdentiasForm('provinsi', val.nama))
                            }
                            else if (screen = 'pengajuan'){
                                dispatch(setFormPengajuan('provinsi', val.nama))
                            }
                            setDataSelected({ ...dataSelected, ['provinsi']: value })
                            takeKabupaten(value)
                            setPickerEnable({
                                ...pickerEnable,
                                ['kabupaten']: true,
                                ['kecamatan']: false,
                                ['desa']: false
                            })
                        }
                    }}
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
                <Label>Kabupaten/Kota</Label>
                <Picker
                    selectedValue={dataSelected.kabupaten}
                    onValueChange={(value, index) => {
                        if (value) {
                            let val = dataKabupaten.find((data) => data.id === value)
                            if (screen === 'identitas'){
                                dispatch(setIdentiasForm('kota', val.nama))
                            }
                            else if (screen = 'pengajuan'){
                                dispatch(setFormPengajuan('kota', val.nama))
                            }
                            setDataSelected({ ...dataSelected, ['kabupaten']: value })
                            takeKecamatan(value)
                            setPickerEnable({
                                ...pickerEnable,
                                ['kecamatan']: true,
                                ['desa']: false
                            })
                        }
                    }}
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
                        if (value) {
                            let val = dataKecamatan.find((data) => data.id === value)
                            if (screen === 'identitas'){
                                dispatch(setIdentiasForm('kecamatan', val.nama))
                            }
                            else if (screen = 'pengajuan'){
                                dispatch(setFormPengajuan('kecamatan', val.nama))
                            }
                            setDataSelected({ ...dataSelected, ['kecamatan']: value })
                            takeDesa(value)
                            setPickerEnable({
                                ...pickerEnable,
                                ['desa']: true
                            })
                        }
                    }}
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
                <Label>Desa/Kelurahan</Label>
                <Picker
                    selectedValue={dataSelected.desa}
                    onValueChange={(value, index) => {
                        if (value) {
                            let val = dataDesa.find((data) => data.id === value)
                            if (screen === 'identitas'){
                                dispatch(setIdentiasForm('desa', val.nama))
                            }
                            else if (screen = 'pengajuan'){
                                dispatch(setFormPengajuan('desa', val.nama))
                            }
                            setData({ ...data, ['desa']: val })
                            setDataSelected({ ...dataSelected, ['desa']: value })
                        }
                    }}
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
        takeProvinsi()
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
        </>
    )
}

export default AlamatPicker