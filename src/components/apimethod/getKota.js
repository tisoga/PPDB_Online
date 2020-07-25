import axios from 'axios'
import { baseUrl } from '../url'

const getKota = async (id) => {
    console.log(id)
    const url = baseUrl + '/ajax/get_kota/' + id
    try {
        const result = await axios.get(url)
        // console.log(result.data)
        return { 'data': result.data.kota_kabupaten }
    }
    catch (error) {
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

export default getKota