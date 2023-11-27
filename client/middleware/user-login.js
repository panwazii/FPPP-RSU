export default async function ({ store, $cookies, redirect }) {
    try {
        const token = await $cookies.get('token');
        const isAdmin = await $cookies.get('isAdmin');
        if (token && isAdmin === false) {
            return redirect('/user/home')
        }
    } catch (error) {
        // console.log("admin login middleware", error)
    }

}