import axios from 'axios'

const patchMethod = async (url, formData = null, token = null) => {
    // console.log(url)
    console.log(formData)
    // console.log(token)
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token ' + token
    }
    try {
        const result = await axios.patch(url, formData, { 'headers': headers })
        return { 'data': result.data }
    }
    catch (error) {
        console.log(error.request)
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

export default patchMethod