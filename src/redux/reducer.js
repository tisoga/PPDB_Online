import { combineReducers } from "redux"
import {
    SET_FORM_LOGIN,
    SET_FORM_REGISTER,
    RESET_FORM_LOGIN,
    RESET_FORM_REGISTER,
    USER_LOGIN,
    SET_PAGE,
    SET_SIGNED,
    SET_NOTIFIKASI,
    SET_EVENTS,
    SET_TOKEN,
    SET_WELCOME,
    SET_PROVINSI,
    SET_IDENTITAS_FORM,
    RESET_IDENTITAS_FORM,
    SET_BERKAS_FORM,
    RESET_BERKAS_FORM,
    SET_FORM_PENGAJUAN,
    INITIAL_FORM_PENGAJUAN,
    SET_FORM_SEKOLAH,
    SET_PENGUMUMAN,
    SET_DETAIL_PENGUMUMAN
} from './actions'

const initialStateLogin = {
    email: '',
    password: ''
}

const initialStateRegister = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
}

const initialUser = {
    first_name: '',
    last_name: '',
    email: '',
    token: ''
}

const initialPage = {
    page: 0
}

const initialSigned = {
    isSigned: false
}

const initialNotifikasi = {
    id: '',
    notifikasi: '',
    tanggal_notifikasi: ''
}

const initialEvents = {
    id: '',
    name: '',
    start_date: '',
    end_date: ''
}

const inititalWelcome = {
    isLoading: true
}

const initialIdentitasForm = {
    first_name: '',
    last_name: '',
    jenis_kelamin: 'L',
    tanggal_lahir: '',
    tempat_lahir: '',
    umur: '',
    alamat: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    desa: '',
    foto_diri: ''
}

const inititalBerkasForm = {
    nilai_ipa: '',
    nilai_matematika: '',
    nilai_inggris: '',
    nilai_indonesia: '',
    berkas_akta: '',
    berkas_ijazah: '',
    berkas_kesehatan: ''
}

const inititalPengajuanForm = {
    first_name: '',
    last_name: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tempat_lahir: '',
    umur: '',
    alamat: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    desa: '',
    foto_diri: '',
    nilai_ipa: '',
    nilai_matematika: '',
    nilai_inggris: '',
    nilai_indonesia: '',
    berkas_akta: '',
    berkas_ijazah: '',
    berkas_kesehatan: ''
}

const initialFormSekolah = {
    nama : '',
    alamat: '',
    daya_tampung: '',
    sisa_zonasi: '',
    sisa_afirmasi: '',
    sisa_perpindahan: '',
    sisa_prestasi: '',
    status_pendaftaran: '',
    jam_daftar_ulang: '',
    tanggal_daftar_ulang: ''
}

const inititalDetailPengumuman = {
    nis : '',
    nama : '',
    alamat: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    nilai_rata: ''
}

const RegisterReducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case SET_FORM_REGISTER:
            return {
                ...state,
                [action.inputType]: action.inputValue
            }
        case RESET_FORM_REGISTER:
            return state = initialStateRegister
    }
    return state
}

const LoginReducer = (state = initialStateLogin, action) => {
    switch (action.type) {
        case SET_FORM_LOGIN:
            return {
                ...state,
                [action.inputType]: action.inputValue
            }
        case RESET_FORM_LOGIN:
            return state = initialStateLogin
    }
    return state
}

const UserReducer = (state = initialUser, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return state = action.payload
        case SET_TOKEN:
            return {
                ...state,
                ['token']: action.payload
            }
        default:
            return state
    }
}

// const UserReducer = (state = initialUser, action) => {
//     switch (action.type) {
//         case USER_LOGIN:
//             return {
//                 ...state,
//                 ['first_name']: action.payload.user.first_name,
//                 ['last_name']: action.payload.user.last_name,
//                 ['email']: action.payload.user.email,
//                 ['token']: action.token,
//             }
//         default:
//             return state
//     }
// }

const PageReducer = (state = initialPage, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                ['page']: 1 - state.page
            }
        default:
            return state
    }
}

const IsSignedReducer = (state = initialSigned, action) => {
    switch (action.type) {
        case SET_SIGNED:
            return {
                ...state,
                ['isSigned']: action.payload
            }
        default:
            return state
    }
}

const IsWelcomeReducer = (state = inititalWelcome, action) => {
    switch (action.type) {
        case SET_WELCOME:
            return {
                ...state,
                ['isLoading']: action.payload
            }
        default:
            return state
    }
}

const NotifikasiReducer = (state = initialNotifikasi, action) => {
    switch (action.type) {
        case SET_NOTIFIKASI:
            return state = action.payload
        default:
            return state
    }
}

const EventsReducer = (state = initialEvents, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return state = action.payload
        default:
            return state
    }
}

const ProvinsiReducer = (state = [], action) => {
    switch (action.type) {
        case SET_PROVINSI:
            return state = action.payload
        default:
            return state
    }
}

const IdentitasFormReducer = (state = initialIdentitasForm, action) => {
    switch (action.type) {
        case SET_IDENTITAS_FORM:
            return {
                ...state,
                [action.form]: action.payload
            }
        case RESET_IDENTITAS_FORM:
            return state = initialIdentitasForm
        default:
            return state
    }
}

const BerkasFormReducer = (state = inititalBerkasForm, action) => {
    switch (action.type) {
        case SET_BERKAS_FORM:
            return {
                ...state,
                [action.form]: action.payload
            }
        case RESET_BERKAS_FORM:
            return state = inititalBerkasForm
        default:
            return state
    }
}

const PengajuanFormReducer = (state = inititalPengajuanForm, action) => {
    switch (action.type) {
        case SET_FORM_PENGAJUAN:
            return {
                ...state,
                [action.form]: action.payload
            }
        case INITIAL_FORM_PENGAJUAN:
            return state = action.payload
        default:
            return state
    }
}

const SekolahReducer = (state = initialFormSekolah, action) => {
    switch (action.type) {
        case SET_FORM_SEKOLAH:
            return state = action.payload
        default:
            return state
    }
}

const PengumumanReducer = (state = [], action) => {
    switch (action.type) {
        case SET_PENGUMUMAN:
            return state = action.payload
        default:
            return state = []
    }
}

const DetailPengumumanReducer = (state = inititalDetailPengumuman, action) => {
    switch (action.type){
        case SET_DETAIL_PENGUMUMAN:
            return {
                ...state,
                ['nis']: action.payload.nis,
                ['nama']: action.payload.nama,
                ['alamat']: action.payload.alamat,
                ['jenis_kelamin']: action.payload.jenis_kelamin,
                ['tanggal_lahir']: action.payload.tanggal_lahir,
                ['nilai_rata']: action.payload.rata
            }
        default:
            return state
    }
}

const reducer = combineReducers({
    LoginReducer,
    RegisterReducer,
    UserReducer,
    PageReducer,
    IsSignedReducer,
    NotifikasiReducer,
    EventsReducer,
    IsWelcomeReducer,
    ProvinsiReducer,
    IdentitasFormReducer,
    BerkasFormReducer,
    PengajuanFormReducer,
    SekolahReducer,
    PengumumanReducer,
    DetailPengumumanReducer
});

export default reducer