export const actions = {
    //Users
    async getAllUsers({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/admin/getAllUsers', data).then((res) => res.data)
    },
    //Rooms
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
    //Equipment
    async getAllEquipment({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/admin/getAllEquipment', data).then((res) => res.data)
    },
    async getSingleEquipment({ getters }, data) {
        return await this.$axios.get('api/admin/getSingleEquipment', data).then((res) => res.data)
    },
    async createEquipment({ getters }, data) {
        return await this.$axios.post('api/admin/createEquipment', data).then((res) => res.data)
    }, async updateEquipment({ getters }, data) {
        return await this.$axios.post('api/admin/updateEquipment', data).then((res) => res.data)
    },
    //Global Equipments
    async getAllGlobalEquipment({ getters }, data) {
        this.$axios.setHeader('authorization', this.$cookies.get('token'))
        return await this.$axios.get('api/admin/getAllGlobalEquipment', data).then((res) => res.data)
    },
    async getSingleGlobalEquipment({ getters }, data) {
        return await this.$axios.get('api/admin/getSingleGlobalEquipment', data).then((res) => res.data)
    },
    async createGlobalEquipment({ getters }, data) {
        return await this.$axios.post('api/admin/createGlobalEquipment', data).then((res) => res.data)
    },
    async updateGlobalEquipment({ getters }, data) {
        return await this.$axios.post('api/admin/updateGlobalEquipment', data).then((res) => res.data)
    },

}