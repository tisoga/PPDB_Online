import React from 'react'
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import {
    Container,
    Content,
    Text,
    Header,
    Left,
    Body,
    Title,
    Right,
    Card,
    CardItem,
    ListItem,
    CheckBox,
    H2,
    Button
} from 'native-base'
import { BackgroundJalur } from '../../assets'

import Icon from 'react-native-vector-icons/Ionicons'
import Carousel, { Pagination } from 'react-native-snap-carousel'

const scr_height = Dimensions.get('window').height

const data = [
    {
        title: "Afirmasi",
        text: "Text 1",
    },
    {
        title: "Zonasi",
        text: "Text 2",
    },
    {
        title: "Prestasi",
        text: "Text 3",
    },
    {
        title: "Perpindahan Orang Tua",
        text: "Text 4",
    },
]


const JalurCard = ({ item, index }) => {
    return (
        <Card>
            <CardItem header style={{ justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{item.title}</Text>
            </CardItem>
            <CardItem>
                <Text style={{ color: '#6A6A6A' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                </Text>
            </CardItem>
            <CardItem footer>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => console.log('as')}
                        style={styles.buttonBox}
                        activeOpacity={0.8}
                    >
                        <Right>
                            <Text style={{ color: 'white' }}>Pilih Jalur</Text>
                        </Right>
                    </TouchableOpacity>
                </View>
            </CardItem>
        </Card>
    )
}

const PilihJalur = ({ navigation }) => {
    return (
        <ImageBackground
            source={BackgroundJalur}
            style={styles.imageBackground}
            imageStyle={{ resizeMode: 'stretch' }}
        >
            <Header transparent style={styles.headerColor}>
                <Left style={{ flex: 1 }} >
                    <Icon name='arrow-back' size={25} color={'white'} onPress={() => navigation.goBack()} />
                </Left>
                <Body style={{ flex: 12 }}>
                    <Title style={{ alignSelf: 'center' }}>Pengajuan Pendaftaran</Title>
                </Body>
            </Header>
            <View style={{ flex: 1.3, marginHorizontal: 22, justifyContent: 'flex-end', marginTop: scr_height - 465 }}>
                <H2 style={{ color: 'white', fontWeight: 'bold', marginLeft: '8%' }}>Pilih Jalur Pendaftaran</H2>
                <Carousel
                    data={data}
                    renderItem={JalurCard}
                    sliderWidth={345}
                    itemWidth={300}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={0}
                    containerStyle={{ marginBottom: '0%' }}
                    dotColor={'black'}
                    inactiveDotColor={'red'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
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
    headerColor: {
        backgroundColor: '#87ceeb'
    },
    buttonBox: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#0275d8',
        height: 30,
        width: 85,
        backgroundColor: '#0275d8',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default PilihJalur