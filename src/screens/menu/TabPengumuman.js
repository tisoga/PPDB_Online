import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import {
    Left,
    Text,
    Right,
    ListItem
} from 'native-base'

import Icon from 'react-native-vector-icons/Ionicons'
import { setDetailPengumuman } from '../../redux/actions'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const TabPengumuman = ({ data, setModal, dispatch }) => {
    const openDetail = (val) => {
        let jk = ''
        const rata = (parseFloat(val.nilai_indonesia) + parseFloat(val.nilai_matematika) + 
                     parseFloat(val.nilai_ipa) + parseFloat(val.nilai_inggris)) / 4
        const tgl = moment(val.tanggal_lahir).format('DD/MM/YYYY')
        if (val.jenis_kelamin == 'L') {
            jk = 'Laki-Laki'
        }
        else if (val.jenis_kelamin == 'P') {
            jk = 'Perempuan'
        }
        const value = {
            'nis': val.nis,
            'nama': val.user.first_name + ' ' + val.user.last_name,
            'alamat': val.alamat,
            'jenis_kelamin': jk,
            'tanggal_lahir': tgl,
            'nilai_rata': rata.toFixed(2)
        }
        // console.log(value)
        dispatch(value)
        setModal(true)
    }
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.nis.toString()}
            renderItem={(itemData) => (
                <ListItem
                    onPress={() => openDetail(itemData.item)}
                >
                    <Left>
                        <Left style={{ flexDirection: 'column' }}>
                            <Text style={styles.textNis}>{itemData.item.nis}</Text>
                            <Text>{itemData.item.user.first_name + ' ' + itemData.item.user.last_name}</Text>
                        </Left>
                    </Left>
                    <Right>
                        <Icon name='arrow-forward' size={20} />
                    </Right>
                </ListItem>
            )}
        />
    )
}

const styles = StyleSheet.create({
    textNis: {
        color: 'gray',
        fontSize: 14
    }
})

export default TabPengumuman