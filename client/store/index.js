export const state = () => ({
    token: null,
    user: null,
})

export const getters = {
    isAdmin(state, getters) {
        if (getters.isAuth && getters.getUser) {
            return getters.getUser.role_id === 2
        } else {
            return false
        }
    },
    isAuth(state) {
        console.log('auth :', state.token);
        return (typeof state.token === "string") && !!state.user
    },
    getUser(state) {
        console.log('user :', state.user);
        return state.user
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
        console.log('setToken muta:', token);
    },
    setUser(state, user) {
        console.log('setUser ', user);
        state.user = user
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get('token')
        await dispatch('setToken', token)
        if (typeof token === "string") {
            await dispatch('fetchUser')
        }
        console.log('servinit :', token);
    },

    setToken({ commit }, token) {
        if (typeof token === "string") {
            commit('setToken', token)
            this.$axios.setHeader("Authorization", token)
            this.$cookies.set('token', token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            console.log('setToken act:', token);

        }
    },

    async fetchUser({ commit }) {
        let data = await this.$axios
            .post('/api/auth/getUserInfo')
            .then((res) => {
                if (!res.data.user) {
                    this.$cookies.remove('token')
                    redirect('/')
                }
                else {
                    var User = res.data.user
                    commit('setUser', User)
                }
            }).catch((error) => { console.log(error); })
        console.log('fetchUser ', data);

    },
}