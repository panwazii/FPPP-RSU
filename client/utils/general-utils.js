export function removeObjectWithId(arr, id) {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === id);
    arrCopy.splice(objWithIdIndex, 1);
    return arrCopy;
}

export function goTo(path) {
    return $nuxt.$router.push(path)
}

export function checkValidPrice(value) {
    const regex = /^\d+\.\d{2}$/;
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return true
    }
    else if (regex.test(value)) {
        return true
    } else { return false }

}

export function formatToIsoNumber(value) {
    if (typeof value === 'number' && !isNaN(value)) {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    } else {
        return '0.00'
    }
}