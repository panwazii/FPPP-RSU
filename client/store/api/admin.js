export const actions = {
    async getAllRooms({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/admin/getAllRooms', data).then((res) => res.data)
    },

}