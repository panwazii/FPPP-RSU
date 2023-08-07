export const actions = {
    async getAllReserve({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/user/getAllReserve', data).then((res) => res.data)
    },
    async createReserve({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.post('api/user/createReserve', data).then((res) => res.data)
    },
}