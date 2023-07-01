export default async function ({ store, $cookies, redirect }) {
    try {
        const Token = await $cookies.get('token');
        if (Token) {
            console.log("hi");
            await store
                .dispatch('api/auth/userLogin')
                .then((res) => {
                    console.log('this is res', res)
                    store.dispatch('setUser', res.user)
                    store.dispatch('setToken', res.token)
                    store.dispatch('setIsAdmin', res.admin)
                    redirect('/user/home')
                })

        }
        else { return }
    } catch (error) {
        // console.log("admin login middleware", error)
    }

}