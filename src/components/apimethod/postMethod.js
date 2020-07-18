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
            console.log(error.response)
            switch (error.response.status) {
                case 400:
                    return { 'error': Object.values(error.response.data)[0][0] }
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