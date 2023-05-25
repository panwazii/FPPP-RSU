export const actions = {
    async adminLogin({ getters }, data) {
        return await this.$axios.post('api/auth/admin/login', data).then((res) => res.data)
    },
    async adminVerify({ getters }, data) {
        return await this.$axios.get('api/auth/admin/verify', data).then((res) => res.data)
    },
}