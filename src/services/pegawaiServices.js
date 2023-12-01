import axios from "axios"
import path from "../config/PathConfig"

export const getData =  () => axios({
        method: 'get',
        url: path.listData
})

export const createData =  (data) => axios({
    method: 'post',
    url: path.listData,
    data
})

export const updateData =  (data, id) => axios({
    method: 'put',
    url: path.listData + '/' + id,
    data
})

export const deleteData =  (id) => axios({
    method: 'delete',
    url: path.listData + '/' + id
})

export const getListProvinsi =  () => axios({
    method: 'get',
    url: path.listProvinsi
})

export const getListKebupaten =  (id) => axios({
    method: 'get',
    url: path.listKabupaten + '/' + id + '.json'
})

export const getListKecamatan =  (id) => axios({
    method: 'get',
    url: path.listKecamatan + '/' + id + '.json'
})

export const getListKelurahan =  (id) => axios({
    method: 'get',
    url: path.listKelurahan + '/' + id + '.json'
})