export const actions = {
    async getAllRooms({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/admin/getAllRooms', data).then((res) => res.data)
    },
    async getSingleRoom({ getters }, data) {
        return await this.$axios.get('api/admin/getSingleRoom', data).then((res) => res.data)
    },
    async createRoom({ getters }, data) {
        return await this.$axios.post('api/admin/createRoom', data).then((res) => res.data)
    },
    async updateRoom({ getters }, data) {
        return await this.$axios.post('api/admin/updateRoom', data).then((res) => res.data)
    },

}