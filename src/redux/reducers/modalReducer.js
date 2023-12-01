const initialValues = {
   open: false,
   type: '',
}

const modalReducer = ( state = initialValues, action ) => {
    switch(action.type){
        case 'OPEN':
            return { ...state, open: true, type: action.payload };
        case 'CLOSE':
            return { ...state, open: false, type: '' }
        default:
            return state;
    }
}

export default modalReducer;