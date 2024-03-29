export const actions = {
    async adminLogin({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.post('api/auth/admin/login', data).then((res) => res.data)
    },
    async adminVerify({ getters }, data) {
        return await this.$axios.get('api/auth/admin/verify', data).then((res) => res.data)
    },
    async userRegister({ getters }, data) {
        return await this.$axios.post('api/auth/user/register', data).then((res) => res.data)
    },
    async userLogin({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.post('api/auth/user/login', data).then((res) => res.data)
    },
    async userVerify({ getters }, data) {
        return await this.$axios.get('api/auth/user/verify', data).then((res) => res.data)
    },
}