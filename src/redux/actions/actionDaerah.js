export const setListDropDown = ( data, key ) => {
    return {
        type: 'SET_LIST_DROPDOWN',
        payload: data,
        key
    }
}

export const setDetail = ( data ) => {
    return {
        type: 'SET_DETAIL',
        payload: data
    }
}

export const resetDetail = () => {
    return {
        type: 'RESET',
    }
}