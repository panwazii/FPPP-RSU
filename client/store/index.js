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
    // isAuth(state) {
    //     console.log('auth :', state.token);
    //     return (typeof state.token === "string") && !!state.user
    // },
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
        console.log('setToken muta:', state.token);
    },
    setIsAdmin(state, isAdmin) {
        state.isAdmin = isAdmin
        console.log('setIsAdmin muta:', state.isAdmin);
    },
    setUser(state, user) {
        state.user = user
        console.log('setUser ', state.user);
    },
    setAdmin(state, admin) {
        state.admin = admin
        console.log('setAdmin ', state.admin);
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        const token = await this.$cookies.get('token');
        const admin = await this.$cookies.get('isAdmin');
        await dispatch('setToken', token);
        if (typeof token === "string") {
            if (admin === true) {
                await dispatch('fetchAdmin');
            }
            else if (admin === false) {
                await dispatch('fetchUser');
            }

        }
    },

    async setToken({ commit }, token) {
        if (typeof token === "string") {
            commit('setToken', token)
            await this.$axios.setHeader("authorization", token)
            await this.$cookies.set('token', token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            console.log('setToken act:', token);

        }
    },

    async setIsAdmin({ commit }, isAdmin) {
        if (isAdmin === true) {
            commit('setIsAdmin', isAdmin)
            // this.$axios.setHeader("admin", isAdmin)
            await this.$cookies.set('isAdmin', isAdmin, {
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
            .then(async (res) => {
                console.log("this is fech admin", res);
                if (!res.data.admin) {
                    await this.$cookies.remove('token')
                    redirect('/')
                }
                else {
                    var Admin = res.data.admin
                    await commit('setAdmin', Admin)
                    await commit('setIsAdmin', true);
                }
            }).catch((error) => { console.log(error); })

    },
    async logout({ commit, dispatch }) {
        console.log('[STORE ACTIONS] - logout');
        await this.$cookies.remove('token');
        await this.$cookies.remove('isAdmin');
        await commit('setToken', null);
        await commit('setAdmin', null);
        await commit('setUser', null);
        await commit('setIsAdmin', null);
    }
}

