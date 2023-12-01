export const validateForm = (data) => {
    let errorInfo = {}
    if( data.nama === '' ){
        errorInfo.nama = "Nama Wajib Diisi"
    }
    if( data.provinsi === '' ){
        errorInfo.provinsi = "Provinsi Wajib Diisi"
    }
    if( data.kabupaten === '' ){
        errorInfo.kabupaten = "Kabupaten Wajib Diisi"
    }
    if( data.kecamatan === '' ){
        errorInfo.kecamatan = "Kecamatan Wajib Diisi"
    }
    if( data.kelurahan === '' ){
        errorInfo.kelurahan = "Kelurahan Wajib Diisi"
    }
    if( data.jalan === '' ){
        errorInfo.jalan = "Alamat Wajib Diisi"
    }
    return errorInfo;
}