import React, { useEffect, useState } from 'react'
import { Modal, Fade, Box, Typography, Backdrop, Divider, TextField, Autocomplete, MenuItem, Button, Stack, Skeleton } from '@mui/material'
import { createData, getListKebupaten, getListKecamatan, getListKelurahan, getListProvinsi, updateData } from '../services/pegawaiServices'
import { useDispatch, useSelector } from 'react-redux'
import { resetDetail, setListDropDown } from '../redux/actions/actionDaerah'
import { closeModal } from '../redux/actions/actionModal'
import { validateForm } from '../utils/validation'

export const ModalComponent = (props) => {
    const { isLoading, setLoading, getListData } = props
    const modalInfo =  useSelector ( state => state.modalReducer)
    const listDaerah = useSelector( state => state.daerahReducer)
    const dispatch = useDispatch()
    const [data, setData] = useState(listDaerah?.detail)
    const [errorData, setErrorData] = useState({})
    

    const handleChangeData = async (key,value) => {
        if(key !== 'nama' && key !== 'kelurahan' && key !== 'jalan' && (value !== '' &&  value !== null)){
            const selectedData = listDaerah[key].find( x => x.name === value )
            switch(key){
                case 'provinsi':
                    setData({...data, 
                        provinsi: value.name,
                        kabupaten: '',
                        kecamatan: '',
                        kelurahan: ''
                    })
                    await getListKebupaten(value.id)
                    .then((res) => {
                        dispatch(setListDropDown(res.data, 'kabupaten'))
                    })
                break;
                case 'kabupaten':
                    setData({...data, 
                        kabupaten: value,
                        kecamatan: '',
                        kelurahan: ''
                    })
                    await getListKecamatan(selectedData.id)
                    .then((res) => {
                        dispatch(setListDropDown(res.data, 'kecamatan'))
                    })
                break;
                case 'kecamatan':
                    setData({...data, 
                        kecamatan: value,
                        kelurahan: ''
                    })
                    await getListKelurahan(selectedData.id)
                    .then((res) => {
                        dispatch(setListDropDown(res.data, 'kelurahan'))
                    })
                break;
                default:
                    break;
            }
        }else if( value === null){
            setData({...data,
            [key]: ''})
        }
        else{
            setData({...data, 
                [key]: value})
        }
    }

    const preloadData = async () => {
        setLoading(true)
        await getListProvinsi()
        .then((res) => {
            dispatch(setListDropDown(res.data, 'provinsi'))
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect( () => {
         preloadData()
    },[])

    const handleSubmit = async () => {
        let errors = validateForm(data)
        if(Object.keys(errors).length !== 0){
            setErrorData(errors)
            return;
        }else{
            if(modalInfo.type === 'CREATE'){
                setLoading(true)
                await createData(data)
                .then(() => {
                    handleCloseModal();
                }).finally(() => {
                    setLoading(false)
                })
            }
            else{
                setLoading(true)
                await updateData(data, data.id)
                .then(() => {
                    handleCloseModal();
                }).finally(() => {
                    setLoading(false)
                })
            }
        }
    }
    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(resetDetail());
        getListData();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

  return (
    <Modal
        aria-labelledby="modal-component"
        aria-describedby="modal-component"
        open={modalInfo.open}
        onClose={() => handleCloseModal()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalInfo.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {modalInfo.type === "CREATE" ? "Tambah Data Pegawai" : "Update Data Pegawai"}
            </Typography>
            <Divider variant="fullWidth" sx={{mt: 2, mb: 2}} />
            <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { mt: 1 },
                }}
                noValidate
                autoComplete="off"
            >   
                { !isLoading ? (
                <TextField label="Nama" id="nama" value={data.nama} onChange={(event) => handleChangeData(event.target.id, event.target.value)}
                     error={ errorData.nama ? true : false } helperText={errorData.nama} fullWidth  />
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mt:-3, mb: -4 }} />)}
                { !isLoading ? (
                <Autocomplete
                    id="provinsi"
                    options={listDaerah?.provinsi}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: '100%' }}
                    value={data?.provinsi}
                    onChange={(event, newInputValue) => handleChangeData('provinsi', newInputValue)}
                    inputValue={data?.provinsi}
                    renderInput={(params) => <TextField {...params} 
                                                label="Provinsi" 
                                                error={errorData.provinsi ? true : false}
                                                helperText={errorData.provinsi}
                                            />}
                />
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mb: -4 }} />)}
                { !isLoading ? (
                <TextField
                    name="kabupaten"
                    select
                    label="Kabupaten"
                    value={data.kabupaten}
                    sx={{ width: '100%' }}
                    onChange={(event) => handleChangeData(event.target.name, event.target.value)}
                    error={errorData.kabupaten ? true : false}
                    helperText={errorData.kabupaten}
                >
                {listDaerah.kabupaten.length !== 0 ? 
                listDaerah.kabupaten.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        {option.name}
                    </MenuItem>
                )) : (
                    <MenuItem value={data.kabupaten}>
                        {data.kabupaten}
                    </MenuItem>
                )}
                </TextField>
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mb: -4 }} />)}
                { !isLoading ? (
                <TextField
                    name="kecamatan"
                    select
                    label="Kecamatan"
                    value={data.kecamatan}
                    sx={{ width: '100%' }}
                    onChange={(event) => handleChangeData(event.target.name, event.target.value)}
                    error={errorData.kecamatan ? true : false}
                    helperText={errorData.kecamatan}
                >
                {listDaerah.kecamatan.length !== 0 ?
                    listDaerah.kecamatan.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                )):(
                    <MenuItem value={data.kecamatan}>
                      {data.kecamatan}
                    </MenuItem>
                )}
                </TextField>
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mb: -4 }} />)}
                { !isLoading ? (
                <TextField
                    name="kelurahan"
                    select
                    label="Kelurahan"
                    value={data.kelurahan}
                    sx={{ width: '100%' }}
                    onChange={(event) => handleChangeData(event.target.name, event.target.value)}
                    error={errorData.kelurahan ? true : false}
                    helperText={errorData.kelurahan}
                >
                {listDaerah.kelurahan.length !== 0 ?
                 listDaerah.kelurahan.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        {option.name}
                    </MenuItem>
                )) : (
                    <MenuItem  value={data.kelurahan}>
                        {data.kelurahan}
                    </MenuItem>
                    
                )}
                </TextField>
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mb: -4 }} />)}
                { !isLoading ? (
                <TextField label="Alamat" id="jalan" value={data.jalan} onChange={(event) => handleChangeData(event.target.id, event.target.value)}
                     error={errorData.jalan ? true : false} helperText={errorData.jalan} fullWidth  />
                ) : (<Skeleton variant="text" sx={{ fontSize: '4.5rem', mb: -4 }} />)}
            </Box>
            { !isLoading ? (
            <Stack sx={{
                mt: 2}}
                direction="row"
                justifyContent ="flex-end"
                alignItems = "center"
                spacing = {2}
            >
                
                    <Button color={modalInfo.type === "CREATE" ? "success" : "warning"} onClick={() => handleCloseModal()}>Kembali</Button>
                    {modalInfo.type === "CREATE" ? (
                        <Button variant="contained" color="success" onClick={handleSubmit} >Tambah</Button>
                     ):(<Button variant="contained" color="warning" onClick={handleSubmit} >Update</Button>)
                    }
            </Stack>
            ) : (
                <Stack sx={{
                    mt: 3}}
                    direction="row"
                    justifyContent ="flex-end"
                    alignItems = "center"
                    spacing = {2}
                >
                    <Skeleton variant="rectangular" width={150} height={50} />
                </Stack>
                )}
          </Box>
        </Fade>
      </Modal>
  )
}
