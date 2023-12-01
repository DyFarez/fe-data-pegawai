export const openModal = ( data, key ) => {
    return {
        type: 'OPEN',
        payload: data,
        key
    }
}

export const closeModal = ( ) => {
    return {
        type: 'CLOSE',
    }
}