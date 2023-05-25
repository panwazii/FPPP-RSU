export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        if (Token && store.state.admin.status === 1) {
            return redirect('/admin')
        }
    } catch (error) {
        console.log("login middleware",error)
        store.dispatch('logout')
        return redirect('/admin-login')
    }

}