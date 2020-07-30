const validate_nilai = (nilai1, nilai2, nilai3, nilai4) => {
    if (parseFloat(nilai1) > 100 || parseFloat(nilai1) < 0) {
        return false
    }
    else if (parseFloat(nilai2) > 100 || parseFloat(nilai2) < 0) {
        return false
    }
    else if (parseFloat(nilai3) > 100 || parseFloat(nilai3) < 0) {
        return false
    }
    else if (parseFloat(nilai4) > 100 || parseFloat(nilai4) < 0) {
        return false
    }
    else {
        return true
    }
}
export default validate_nilai