export function removeObjectWithId(arr, id) {
    const arrCopy = Array.from(arr);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === id);
    arrCopy.splice(objWithIdIndex, 1);
    return arrCopy;
}

export function goTo(path) {
    return $nuxt.$router.push(path)
}