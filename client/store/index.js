import { removeObjectWithId } from '../utils/general-utils'

export const state = () => ({
    token: null,
    isAdmin: null,
    user: null,
    admin: null,
    path_name_th: "",
    cartItems: []
})

export const mutations = {
    //Auth
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
    },
    //Path Name
    setPathName(state, name) {
        state.path_name_th = name
    },
    //Cart
    setCartItems(state, item) {
        state.cartItems.push(item)
    },
    deleteCartItems(state, id) {
        removeObjectWithId(state.cartItems, id)
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        try {
            const token = await this.$cookies.get('token');
            const admin = await this.$cookies.get('isAdmin');
            // await this.$cookies.set('cartItems', [] , {
            //     path: '/',
            //     maxAge: 60 * 60 * 24 * 7
            // })
            await dispatch('setToken', token);
            if (typeof token === "string") {
                if (admin === true) {
                    console.log("admin");
                    return await dispatch('fetchAdmin');
                }
                else if (admin === false) {
                    console.log("user");
                    return await dispatch('fetchUser');
                }

            }
        } catch (error) {
            // await dispatch('logout')
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
            await this.$cookies.set('isAdmin', isAdmin, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            })
            console.log('setIsAdmin act:', isAdmin);

        }
    },

    async setAdmin({ commit }, admin) {
        commit('setAdmin', admin)
    },
    async setUser({ commit }, admin) {
        commit('setUser', admin)
    },

    async fetchUser({ commit }) {
        let Response = await this.$axios.get('/api/user/getUserInfo')
        console.log("this is fech user", Response.data);
        if (!Response.data.user) {
            await dispatch('logout')
            redirect('/')
        }
        else {
            var User = Response.data.user
            await commit('setUser', User)
            await commit('setIsAdmin', false);
        }

    },
    async fetchAdmin({ commit, dispatch }) {
        let Response = await this.$axios.get('/api/admin/getAdminInfo')
        console.log("this is fech admin", Response.data);
        if (!Response.data.admin) {
            await dispatch('logout')
            redirect('/')
        }
        else {
            var Admin = Response.data.admin
            await commit('setAdmin', Admin)
            await commit('setIsAdmin', true);
        }
    },
    async logout({ commit, dispatch }) {
        console.log('[STORE ACTIONS] - logout');
        await this.$cookies.remove('token');
        await this.$cookies.remove('isAdmin');
        await commit('setToken', null);
        await commit('setAdmin', null);
        await commit('setUser', null);
        await commit('setIsAdmin', null);
    },
    //Path Name
    async setPathName({ commit }, pathName) {
        commit('setPathName', pathName)
    },
    addCartItems({ commit }, item) {
        commit('setCartItems', item)
    },
    removeCartItems({ commit }, item) {
        commit('deleteCartItems', item.id)
    }
}

export const getters = {
    //Auth
    getUser(state) {
        console.log('user :', state.user);
        return state.user
    },
    getAdmin(state) {
        return state.admin
    },
    //Path Name
    getPathName(state) {
        return state.path_name_th
    },
    //Cart
    getCartItems(state) {
        return state.cartItems
    }
}
