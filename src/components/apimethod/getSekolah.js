import axios from 'axios'
import { baseUrl, sekolahUrl } from '../url'

const getSekolah = async () => {
    const url = baseUrl + sekolahUrl
    const headers = {
        'Authorization': ''
    }
    try {
        const result = await axios.get(url, { 'headers': headers })
        // console.log(result.data)
        return {'data': result.data}
    }
    catch (error) {
        // console.log(error.response)
        if (error.response) {
            // console.log(error.response.status)
            // console.log(error.response.data)
            switch (error.response.status) {
                case 401:
                    return { 'error': Object.values(error.response.data)[0] }
                case 404:
                    return { 'error': Object.values(error.response.data)[0] }
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


export default getSekolah