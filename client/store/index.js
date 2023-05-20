export const state = () => ({
    token: null,
    isAdmin: null,
    user: null,
    admin: null,
})

export const getters = {
    // isAdmin(state, getters) {
    //     if (getters.isAuth && getters.getUser) {
    //         return getters.getUser.role_id === 2
    //     } else {
    //         return false
    //     }
    // },
    isAuth(state) {
        console.log('auth :', state.token);
        return (typeof state.token === "string") && !!state.user
    },
    getUser(state) {
        console.log('user :', state.user);
        return state.user
    },
    getAdmin(state) {
        console.log('admin :', state.admin);
        return state.admin
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
        console.log('setToken muta:', token);
    },
    setIsAdmin(state, isAdmin) {
        state.isAdmin = isAdmin
        console.log('setIsAdmin muta:', isAdmin);
    },
    setUser(state, user) {
        console.log('setUser ', user);
        state.user = user
    },
    setAdmin(state, admin) {
        console.log('setUser ', admin);
        state.admin = admin
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = this.$cookies.get('token');
        const admin = this.$cookies.get('isAdmin');
        await dispatch('setToken', token);
        if (typeof token === "string") {
            if (admin === true) {
                await dispatch('fetchAdmin');
            }
            else if (admin === false) {
                await dispatch('fetchUser');
            }

        }
        console.log('servinit token :', token);
        console.log('servinit admin :', admin);
    },

    setToken({ commit }, token) {
        if (typeof token === "string") {
            commit('setToken', token)
            this.$axios.setHeader("authorization", token)
            this.$cookies.set('token', token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            console.log('setToken act:', token);

        }
    },

    setIsAdmin({ commit }, isAdmin) {
        if (isAdmin === true) {
            commit('setIsAdmin', isAdmin)
            this.$axios.setHeader("admin", isAdmin)
            this.$cookies.set('isAdmin', isAdmin, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            console.log('setIsAdmin act:', isAdmin);

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
    async fetchAdmin({ commit }) {
        let data = await this.$axios
            .get('/api/admin/getAdminInfo')
            .then((res) => {
                if (!res.data.admin) {
                    this.$cookies.remove('token')
                    redirect('/')
                }
                else {
                    var Admin = res.data.admin
                    commit('setUser', Admin)
                }
            }).catch((error) => { console.log(error); })

    },
}