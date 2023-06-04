export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        const AdminStatus = await store.state.admin.status
        if (Token && AdminStatus === 1) {
            return redirect('/admin/home')
        }
    } catch (error) {
        // console.log("admin login middleware", error)
    }

}