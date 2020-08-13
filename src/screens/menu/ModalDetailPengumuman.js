import React, { useState } from 'react'
import {
    StyleSheet, View,
} from "react-native"

import {
    Title,
    Text,
    Button,
} from "native-base"

import Modal from 'react-native-modal'

const ModalDetailPengumuman = ({ isVisible, setModal, data }) => {
    console.log(data)
    return (
        <Modal isVisible={isVisible}
            style={styles.viewModal}
            animationIn={"slideInRight"}
            animationOut={'slideOutRight'}
            onBackdropPress={() => setModal(false)}
            onBackButtonPress={() => setModal(false)}
        >
            <View style={styles.containerModal}>
                <View style={styles.viewTitleModal}>
                    <Title style={{ color: 'black' }}>Detail Siswa : {data.nis}</Title>
                </View>
                <View style={styles.viewContentModal}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.textTitleModal}>Nama</Text>
                            </View>
                            <View style={{ flex: 0.1 }}>
                                <Text style={styles.textTitleModal}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>{data.nama}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.textTitleModal}>Alamat</Text>
                            </View>
                            <View style={{ flex: 0.1 }}>
                                <Text style={styles.textTitleModal}>:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>{data.alamat}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.textTitleModal}>Jenis Kelamin</Text>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <Text style={styles.textTitleModal}>:</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent:'center' }}>
                                <Text>{data.jenis_kelamin}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.textTitleModal}>Tanggal Lahir</Text>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <Text style={styles.textTitleModal}>:</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent:'center' }}>
                                <Text>{data.tanggal_lahir}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.textTitleModal}>Rata-Rata Nilai UN</Text>
                            </View>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <Text style={styles.textTitleModal}>:</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent:'center' }}>
                                <Text>{data.nilai_rata}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContentModal}>
                        <Button full
                            onPress={() => setModal(false)}
                        >
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        backgroundColor: 'white',
        height: 430,
        // justifyContent: 'flex-end',
        borderRadius: 10
    },
    viewTitleModal: {
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#87ceeb',
        flex: 1,
    },
    viewContentModal: {
        marginTop: 10,
        marginHorizontal: 10,
        flex: 12,
    },
    buttonContentModal: {
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 10,
        flex: 1
    },
    textTitleModal: {
        fontWeight: 'bold'
    }
})

export default ModalDetailPengumuman