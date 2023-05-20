export const actions = {
    async adminLogin({ getters }, data) {
        return await this.$axios.post('api/auth/admin/login', data).then((res) => res.data)
    },
    async getLevel({ getters }, data) {
        return await this.$axios.post('/api/auth', data).then((res) => res.data)
    },
    async getAdminLevel({ getters }, data) {
        return await this.$axios
            .post('/api/adminAuth', data)
            .then((res) => res.data)
    },
    async getUserLevel({ getters }, data) {
        return await this.$axios.post('/api/userAuth', data).then((res) => res.data)
    },

}