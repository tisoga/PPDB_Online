import axios from 'axios'
import { baseUrl } from '../url'

const getProvinsi = async () => {
    const url = baseUrl + '/ajax/get_provinsi'
    try {
        const result = await axios.get(url)
        // console.log(result.data.provinsi)
        return { 'data': result.data.provinsi }
    }
    catch (error) {
        if (error.response) {
            console.log(error)
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

export default getProvinsi