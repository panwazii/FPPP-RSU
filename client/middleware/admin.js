export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token')
        const AdminStatus = await store.state.admin.status
        const AdminVerify = await store.dispatch('api/auth/adminVerify', { params: { token: Token } })

        if (!(Token && AdminStatus === 1)) {
            store.dispatch('logout')
            return redirect('/admin-login')
        }
        if (AdminVerify.type === "admin" || AdminVerify.type === "super-admin") {
            return
        }
        else {
            store.dispatch('logout')
            return redirect('/admin-login')
        }
    } catch (error) {
        store.dispatch('logout')
        return redirect('/admin-login')
    }

}