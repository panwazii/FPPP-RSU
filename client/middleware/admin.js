export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        console.log("this is store state",store.getters.getAdmin);
        if (!(Token && store.state.admin.status === 1)) {
            store.dispatch('logout')
            return redirect('/admin-login')
        }
    } catch (error) {
        console.log("admin middleware",error)
        store.dispatch('logout')
        return redirect('/admin-login')
    }

}