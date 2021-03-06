import axios from 'axios'
import qs from 'qs'

const postMethod = async (url, data = null, token = null) => {
    const headers = {
        'Authorization': 'Token ' + token
    }
    try {
        if (token) {
            const result = await axios.post(url, qs.stringify(data), { 'headers': headers })
            return { 'data': result.data }
        }
        else {
            const result = await axios.post(url, qs.stringify(data))
            return { 'data': result.data }
        }
    }
    catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    let data = ''
                    console.log(error.response.data)
                    if (error.response.data.length == 1) {
                        data = { 'error': Object.values(error.response.data)[0] }
                    }
                    else if (error.response.data.length >= 2) {
                        data = { 'error': Object.values(error.response.data)[0][0] }
                    }
                    else {
                        if (error.response.data.password_lama){
                            data = { 'error': Object.values(error.response.data)[0] }
                        }
                        else{
                            data = { 'error': Object.values(error.response.data)[0][0] }
                        }
                        // console.log(data)
                    }
                    return data
                default:
                    return { 'error': 'Terjadi Kesalahan' }
            }
        }
        else if (error.request) {
            return { 'error': 'Periksa Koneksi Anda atau Coba beberapa saat lagi' }
        }
        else {
            return { 'error': 'Terjadi Kesalahan' }
        }
    }
}

export default postMethod