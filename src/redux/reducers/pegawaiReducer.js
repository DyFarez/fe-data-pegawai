const initialValues = []

const pegawaiReducer = ( state = initialValues, action ) => {
    switch(action.type){
        case 'SET_DATA':
            return [ ...action.payload ];
        default:
            return state;
    }
}

export default pegawaiReducer;