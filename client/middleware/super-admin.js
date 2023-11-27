export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token')
        const AdminStatus = await store.state.admin.status
        const AdminVerify = await store.dispatch('api/auth/adminVerify', { params: { token: Token } })
        console.log(AdminVerify);
        if (!(Token && AdminStatus === 1)) {
            store.dispatch('logout')
            return redirect('/auth/admin-login')
        }
        if (!(AdminVerify.type === "super-admin")) {
            return redirect('/admin')
        }
    } catch (error) {
        store.dispatch('logout')
        return redirect('/auth/admin-login')
    }

}