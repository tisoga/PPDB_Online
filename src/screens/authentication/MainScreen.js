import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image
} from 'react-native';

import {
    Container,
    Text,
    Tab,
    Tabs,
    Button,
} from 'native-base';

import { Background, Logo } from '../../assets';
import TabLogin from './TabLogin';
import TabRegister from './TabRegister';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetFormLogin,
    resetFormRegister
} from '../../redux/actions'

const MainScreen = ({ navigation}) => {
    const [page, setPage] = useState(0)
    const dispatch = useDispatch();
    const resetValue = () => {
        dispatch(resetFormRegister())
        dispatch(resetFormLogin())
    }

    return (
        <>
            <Container>
                <ImageBackground
                    source={Background}
                    style={styles.imageBackground}
                >
                    <View style={styles.viewLogo}>
                        <Image
                            style={styles.imageLogo}
                            source={Logo}
                        />
                        <Text style={styles.textPPDB}>PPDB Online</Text>
                    </View>
                    <View style={styles.viewInput}>
                        <Tabs onChangeTab={resetValue} page={page}>
                            <Tab heading='Login' style={styles.tabStyle}>
                                <TabLogin />
                            </Tab>
                            <Tab heading='Register' style={styles.tabStyle}>
                                <TabRegister setPage={setPage}/>
                            </Tab>
                        </Tabs>
                    </View>
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
    viewLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewInput: {
        flex: 2,
        padding: 8
    },
    imageLogo: {
        width: 80,
        height: 80
    },
    textPPDB: {
        fontSize: 30,
    },
    tabStyle: {
        backgroundColor: 'rgba(0,0,255,0.3)',
    },
});

export default MainScreen