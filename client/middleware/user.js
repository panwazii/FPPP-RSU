export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token')
        const UserVerify = await store.dispatch('api/auth/userVerify', { params: { token: Token } })

        if (!Token) {
            store.dispatch('logout')
            return redirect('/auth/login')
        }
        if (UserVerify.verify === true) {
            return
        }
        else {
            store.dispatch('logout')
            return redirect('/auth/login')
        }
    } catch (error) {
        store.dispatch('logout')
        return redirect('/auth/login')
    }

}