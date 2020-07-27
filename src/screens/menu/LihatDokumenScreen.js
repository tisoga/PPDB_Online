import React from 'react'
import {
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native'

import {
    Header,
    Left,
    Title,
    Right,
    Body
} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseUrl } from '../../components/url'

const LihatDokumenScreen = ({ route, navigation }) => {
    const { title, berkas } = route.params;
    return (
        <ImageBackground
            source={{ uri: baseUrl + berkas }}
            style={styles.imageBackground}
            imageStyle={{ resizeMode: 'stretch' }}
        >
            <Header style={{ marginTop: 20, backgroundColor: '#87ceeb' }}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>{title}</Title>
                </Body>
            </Header>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    },
})

export default LihatDokumenScreen