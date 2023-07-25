export const actions = {
    async getAllUserTypesDropdown({ getters }, data) {
        return await this.$axios.get('api/public/getAllUserTypesDropdown', data).then((res) => res.data)
    },
    async getAllNews({ getters }, data) {
        return await this.$axios.get('api/public/getAllNews', data).then((res) => res.data)
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
    async getSingleNews({ getters }, data) {
        return await this.$axios.get('api/public/getSingleNews', data).then((res) => res.data)
    },
    // Equipment
    async getAllEquipmentInfo({ getters }, data) {
        return await this.$axios.get('api/public/getAllEquipmentInfo', data).then((res) => res.data)
    },
    async getAllEquipmentInfoInRoom({ getters }, data) {
        return await this.$axios.get('api/public/getAllEquipmentInfoInRoom', data).then((res) => res.data)
    },
    async getSingleEquipmentInfo({ getters }, data) {
        return await this.$axios.get('api/public/getSingleEquipmentInfo', data).then((res) => res.data)
    },
}