export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        const AdminStatus = await store.state.admin.status
        console.log("this is admin middleware", AdminStatus);
        if (!(Token && AdminStatus === 1)) {
            store.dispatch('logout')
            return redirect('/admin-login')
        }
    } catch (error) {
        console.log("admin middleware", error)
        store.dispatch('logout')
        return redirect('/admin-login')
    }

}