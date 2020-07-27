export const SET_FORM_LOGIN = 'SET_FORM_LOGIN';
export const SET_FORM_REGISTER = 'SET_FORM_REGISTER';
export const RESET_FORM_LOGIN = 'RESET_FORM_LOGIN';
export const RESET_FORM_REGISTER = 'RESET_FORM_REGISTER';

export const POST_METHOD_ERROR = 'POST_METHOD_ERROR';
export const POST_METHOD_PENDING = 'POST_METHOD_PENDING';
export const POST_METHOD_SUCCESS = 'POST_METHOD_SUCCESS';

export const USER_LOGIN = 'USER_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';

export const SET_PAGE = 'SET_PAGE';
export const SET_SIGNED = 'SET_SIGNED';
export const SET_WELCOME = 'SET_WELCOME';

export const SET_EVENTS = 'SET_EVENTS';
export const SET_NOTIFIKASI = 'SET_NOTIFIKASI';
export const SET_PROVINSI = 'SET_PROVINSI';

export const SET_IDENTITAS_FORM = 'SET_IDENTITAS_FORM';
export const RESET_IDENTITAS_FORM = 'RESET_IDENTITAS_FORM';
export const SET_BERKAS_FORM = 'SET_BERKAS_FORM';
export const RESET_BERKAS_FORM = 'RESET_BERKAS_FORM';

export const INITIAL_FORM_PENGAJUAN = 'INITIAL_FORM_PENGAJUAN';
export const SET_FORM_PENGAJUAN = 'SET_FORM_PENGAJUAN';

export const setFormLogin = (inputType, inputValue) => {
    return {
        type: SET_FORM_LOGIN,
        inputType: inputType,
        inputValue: inputValue
    }
}

export const resetFormLogin = () => {
    return {
        type: RESET_FORM_LOGIN
    }
}

export const setFormRegister = (inputType, inputValue) => {
    return {
        type: SET_FORM_REGISTER,
        inputType: inputType,
        inputValue: inputValue
    }
}

export const resetFormRegister = () => {
    return {
        type: RESET_FORM_REGISTER
    }
}

export const setUserLogin = (data) => {
    return {
        type: USER_LOGIN,
        payload: data
    }
}

export const setUserToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export const setPageTabs = () => {
    return {
        type: SET_PAGE,
    }
}

export const setIsSigned = (val) => {
    return {
        type: SET_SIGNED,
        payload: val
    }
}

export const setEvents = (data) => {
    return {
        type: SET_EVENTS,
        payload: data
    }
}

export const setNotifikasi = (data) => {
    return {
        type: SET_NOTIFIKASI,
        payload: data
    }
}

export const setWelcome = (val) => {
    return {
        type: SET_WELCOME,
        payload: val
    }
}

export const setProvinsi = (val) => {
    return {
        type: SET_PROVINSI,
        payload: val
    }
}

export const setIdentiasForm = (form, val) => {
    return {
        type: SET_IDENTITAS_FORM,
        payload: val,
        form: form
    }
}

export const resetIdentitasForm = () => {
    return{
        type: RESET_IDENTITAS_FORM
    }
}

export const setBerkasForm = (form, val) => {
    return {
        type: SET_BERKAS_FORM,
        payload: val,
        form: form
    }
}

export const resetBerkasForm = () => {
    return{
        type: RESET_BERKAS_FORM
    }
}

export const setFormPengajuan = (form, val) => {
    return {
        type: SET_FORM_PENGAJUAN,
        payload: val,
        form: form
    }
}

export const initialFormPengajuan = (val) => {
    return {
        type: INITIAL_FORM_PENGAJUAN,
        payload: val,
    }
}