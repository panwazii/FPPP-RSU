import { removeObjectWithId } from '../utils/general-utils'

export const state = () => ({
    token: null,
    isAdmin: null,
    user: null,
    admin: null,
    path_name_th: "",
    cart: [],
    production_lines: []
})

export const mutations = {
    //Auth
    setToken(state, token) {
        state.token = token
        console.log('setToken muta:', state.token);
    },
    setIsAdmin(state, isAdmin) {
        state.isAdmin = isAdmin
    },
    setUser(state, user) {
        state.user = user
        console.log('setUser ', state.user);
    },
    setAdmin(state, admin) {
        state.admin = admin
    },
    //Path Name
    setPathName(state, name) {
        state.path_name_th = name
    },
    //Cart
    setCart(state, items) {
        state.cart = items
    },
    //Production Line
    setProductionLines(state, items) {
        state.production_lines = items
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        try {
            const token = await this.$cookies.get('token');
            const admin = await this.$cookies.get('isAdmin');
            console.log("this is isAdmin", admin);
            await dispatch('setToken', token);
            if (typeof token === "string") {
                await dispatch('fetchProductionLine');
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
            // console.log(error);
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
        }
    },

    async setIsAdmin({ commit }, isAdmin) {
        commit('setIsAdmin', isAdmin)
        await this.$cookies.set('isAdmin', isAdmin, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })
    },

    async setAdmin({ commit }, admin) {
        commit('setAdmin', admin)
    },
    async setUser({ commit }, user) {
        commit('setUser', user)
    },

    async fetchUser({ commit, dispatch }) {
        let Response = await this.$axios.get('/api/user/getUserInfo')
        if (!Response.data.user) {
            await dispatch('logout')
            redirect('/')
        }
        else {
            let User = Response.data.user
            await commit('setUser', User)
            await commit('setIsAdmin', false)
            await dispatch('getCartItems')
        }

    },
    async fetchAdmin({ commit, dispatch }) {
        let Response = await this.$axios.get('/api/admin/getAdminInfo')
        if (!Response.data.admin) {
            await dispatch('logout')
            redirect('/')
        }
        else {
            let Admin = Response.data.admin
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
    //Cart
    async getCartItems({ commit }) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        let cartItems = await this.$axios.get('/api/user/getAllCart')
        await commit('setCart', cartItems.data.cart[0].cart_items)
    },
    async addCartItem({ commit, dispatch }, itemId) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        await this.$axios.post('/api/user/createCartItem', { id: itemId })
        await dispatch('getCartItems')
    },
    async removeCartItem({ commit, dispatch }, itemId) {
        await this.$axios.delete('/api/user/deleteCartItem', { params: { id: itemId } })
        await dispatch('getCartItems')
    },
    //Production Line (for user layout)
    async fetchProductionLine({ commit, dispatch }) {
        const productionLine = await this.$axios.get('api/public/getAllProductionLine')
        commit('setProductionLines', productionLine.data.production_lines)
    },
    //Path Name
    async setPathName({ commit }, pathName) {
        commit('setPathName', pathName)
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
        return state.cart
    },
    //Production Line
    getProductionLines(state) {
        return state.production_lines
    }
}
