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
    SET_IDENTITAS_FORM
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
    first_name : '',
    last_name : '',
    jenis_kelamin : 'L',
    tanggal_lahir : '',
    tempat_lahir : '',
    umur : '',
    alamat : '',
    provinsi : '',
    kota : '',
    kecamatan : '',
    desa : '',
    foto_diri : ''
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
                [action.form] : action.payload
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
    IdentitasFormReducer
});

export default reducer