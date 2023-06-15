export const actions = {
    async getAllUserTypesDropdown({ getters }, data) {
        return await this.$axios.get('api/public/getAllUserTypesDropdown', data).then((res) => res.data)
    },
    async getAllRooms({ getters }, data) {
        return await this.$axios.get('api/public/getAllRooms', data).then((res) => res.data)
    },
    async getAllEquipment({ getters }, data) {
        return await this.$axios.get('api/public/getAllEquipment', data).then((res) => res.data)
    },
    async getAllEquipmentByRoom({ getters }, data) {
        return await this.$axios.get('api/public/getAllEquipmentByRoom', data).then((res) => res.data)
    },
    async getSingleRoom({ getters }, data) {
        return await this.$axios.get('api/public/getSingleRoom', data).then((res) => res.data)
    },
}