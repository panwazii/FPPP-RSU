export default async function ({ store, $cookies, redirect }) {
    try {
        const token = await $cookies.get('token')
        const isAdmin = await $cookies.get('isAdmin')

        if (!token) {
            return
        }
        else {
            if (isAdmin) {
                return redirect('/admin/home')
            }
            if (!isAdmin) {
                return redirect('/user/home')
            }
        }
    } catch (error) {
        store.dispatch('logout')
        return redirect('/')
    }

}