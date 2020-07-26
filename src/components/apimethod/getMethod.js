import axios from 'axios'

const getMethod = async (url, token) => {
    const headers = {
        'Authorization': 'Token ' + token
    }
    try {
        if (token){
            const result = await axios.get(url, { 'headers': headers })
            return {'data': result.data}
        }
        else{
            const result = await axios.get(url)
            return {'data': result.data}
        }
    }
    catch (error) {
        // console.log(error.response)
        if (error.response) {
            // console.log(error.response.status)
            console.log(error.response.data)
            switch (error.response.status) {
                case 401:
                    return { 'error': Object.values(error.response.data)[0][0] }
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

export default getMethod