export function numberOrDefault(x:any, val:any) {
    try {
        if (x === null) {
            return val
        }
        
        const y = Number(x)
        if (!Number.isNaN(y)) {
            return Number(y)
        } else {
            return val
        }
    }
    catch (error) { console.log(error); }
}
