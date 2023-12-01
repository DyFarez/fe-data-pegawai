const initialValues = {
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    detail: {
        nama: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        jalan: ''
    }
}

const daerahReducer = ( state = initialValues, action ) => {
    switch(action.type){
        case 'SET_LIST_DROPDOWN':
            return { ...state, [action.key]: [...action.payload]};
        case 'SET_DETAIL':
            return { ...state, detail: action.payload }
        case 'RESET':
            return  initialValues 
        default:
            return state;
    }
}

export default daerahReducer;