import React, { useEffect, useState } from 'react';
// import Container from '@mui/material/Container';
import { deleteData, getData } from '../services/pegawaiServices';
import { useDispatch, useSelector } from 'react-redux';
import { setListPegawai } from '../redux/actions/actionPegawai';
import { styled } from '@mui/material/styles';
import { Backdrop, Container, CircularProgress, Button, Typography, Grow, Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper, Breadcrumbs, IconButton, Zoom, Stack } from '@mui/material';
// import { AddCircleRoundedIcon } from '@mui/icons-material';
import { tableCellClasses } from '@mui/material/TableCell';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { ModalComponent } from '../component/ModalComponent';
import { setDetail } from '../redux/actions/actionDaerah';
import { openModal } from '../redux/actions/actionModal';


export const Home = () => {
    const [isLoading, setLoading] = useState(false)
    // const [openModal, setOpenModal] = useState(false)
    const listPegawai =  useSelector ( state => state.pegawaiReducer)
    const daerah =  useSelector ( state => state.daerahReducer)
    const modalInfo =  useSelector ( state => state.modalReducer)
    const dispatch = useDispatch();

    const getListData = async () => {
        setLoading(true)
        await getData()
        .then((res) => {
            dispatch(setListPegawai(res.data))
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getListData()
    },[])

    const handleDelete = async (data) => {
      setLoading(true)
      await deleteData(data.id)
      .then((res) => {
        if(res.request.status === 200){
          getListData()
        }
      }).finally(() => {
        setLoading(false)
      })
    }

    const handleUpdate = (data) => {
      dispatch(setDetail(data))
      dispatch(openModal('UPDATE'))
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    return (
        <Container> 
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            <Breadcrumbs sx={{ mt: 2 }}separator={<NavigateNextIcon fontSize="small" />}>
              <Typography color="text.primary" variant='h4'>Beranda</Typography>
              <Typography color="text.primary" variant="h3">Data Pegawai</Typography>
            </Breadcrumbs >
            <Stack mt={2} direction="row" justifyContent="flex-end"  alignItems="center"  spacing={2}>
              <Button variant='contained' color='success' onClick={() => dispatch(openModal('CREATE'))} startIcon={<AddCircleRoundedIcon />} >Tambah Data</Button>
            </Stack>
            <TableContainer component={Paper} sx={{ mb: 5, mt: 2}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{background: '#0268a8'}}>
                  <TableRow>
                    <TableCell sx={{ color: 'white'}}>Nama</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Provinsi</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Kabupaten</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Kecamatan</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Kelurahan</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Jalan</TableCell>
                    <TableCell align="center" sx={{ color: 'white'}}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listPegawai.length !== 0 &&
                    listPegawai.map( (data) => {
                      return(
                        <StyledTableRow key={data.id}>
                          <StyledTableCell component="th" scope="row">
                            {data.nama}
                          </StyledTableCell>
                          <StyledTableCell align="center">{data.provinsi}</StyledTableCell>
                          <StyledTableCell align="center">{data.kabupaten}</StyledTableCell>
                          <StyledTableCell align="center">{data.kecamatan}</StyledTableCell>
                          <StyledTableCell align="center">{data.kelurahan}</StyledTableCell>
                          <StyledTableCell align="center">{data.jalan}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Stack direction="row" spacing={2} justifyContent="center">
                              <Button variant="outlined" color="warning"  onClick={() => handleUpdate(data)}><CreateRoundedIcon /></Button>
                              <Button variant="outlined" color="error" onClick={() => handleDelete(data)}><DeleteIcon /></Button>
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {modalInfo.open && 
              <ModalComponent isLoading={isLoading} setLoading={setLoading} getListData={getListData}/>
            }
        </Container>
    )
}
