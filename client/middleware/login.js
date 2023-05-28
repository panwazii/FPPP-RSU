export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        const AdminStatus = await store.state.admin.status
        if (Token && AdminStatus === 1) {
            return redirect('/admin')
        }
    } catch (error) {
        console.log("login middleware", error)
        store.dispatch('logout')
        return redirect('/admin-login')
    }

}