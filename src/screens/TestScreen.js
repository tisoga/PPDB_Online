import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import { View } from "react-native"
import { Text, Button } from "native-base"
import { getMethod } from '../components/apimethod'
import { baseUrl, eventsUrl, notifikasiUrl } from '../components/url'
import { setNotifikasi, setEvents } from '../redux/actions'

const TestScreen = () => {
    const userState = useSelector((state) => state.UserReducer)
    const notifkasiState = useSelector((state) => state.NotifikasiReducer)
    const eventsState = useSelector((state) => state.EventsReducer)
    const dispatch = useDispatch()

    const deleteAS = async () => {
        await AsyncStorage.removeItem('@authToken')
    }
    const getUser = async () => {
        console.log(userState)
    }

    const getEvents = async () => {
        result = await getMethod(baseUrl+eventsUrl, userState.token)
        dispatch(setEvents(result.data))
        console.log(result.data)
    }

    const getNotifikasi = async () => {
        result = await getMethod(baseUrl+notifikasiUrl, userState.token)
        console.log(result.data)
        dispatch(setNotifikasi(result.data))
    }

    const logNotifikasi = async () => {
        console.log(notifkasiState)

    }

    const logEvent = async () => {
        console.log(eventsState)

    }
    return (
        <View>
            <Text>{userState.first_name + ' ' + userState.last_name}</Text>
            <Button onPress={() => deleteAS()}>
                <Text>Delete AsyncStorage</Text>
            </Button>
            <Button onPress={() => getUser()}>
                <Text>Get User Login Data</Text>
            </Button>
            <Button onPress={() => getEvents()}>
                <Text>Get Event Data</Text>
            </Button>
            <Button onPress={() => getNotifikasi()}>
                <Text>Get Notifikasi Data</Text>
            </Button>
            <Button onPress={() => logNotifikasi()}>
                <Text>Log Notifikasi State</Text>
            </Button>
            <Button onPress={() => logEvent()}>
                <Text>Log Event State</Text>
            </Button>
        </View>
    )
}

export default TestScreen