export const actions = {
  //Users
  async getAllUsers({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllUsers', data)
      .then((res) => res.data)
  },
  async getSingleUser({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleUser', data)
      .then((res) => res.data)
  },
  async updateUser({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateUser', data)
      .then((res) => res.data)
  },
  //Rooms
  async getAllRooms({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllRooms', data)
      .then((res) => res.data)
  },
  async getDropdownRoom({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getDropdownRoom', data)
      .then((res) => res.data)
  },
  async getSingleRoom({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleRoom', data)
      .then((res) => res.data)
  },
  async createRoom({ getters }, data) {
    return await this.$axios
      .post('api/admin/createRoom', data)
      .then((res) => res.data)
  },
  async updateRoom({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateRoom', data)
      .then((res) => res.data)
  },
  async deleteRoom({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteRoom', data)
      .then((res) => res.data)
  },
  async deleteRoomPicture({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteRoomPicture', data)
      .then((res) => res.data)
  },
  //Equipment
  async getSingleEquipmentInfo({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getSingleEquipmentInfo', data)
      .then((res) => res.data)
  },
  async getAllEquipmentInfo({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllEquipmentInfo', data)
      .then((res) => res.data)
  },
  async getDropdownEquipmentInfo({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getDropdownEquipmentInfo', data)
      .then((res) => res.data)
  },
  async getAllEquipmentStock({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllEquipmentStock', data)
      .then((res) => res.data)
  },
  async getAllEquipmentInfoInRoom({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllEquipmentInfoInRoom', data)
      .then((res) => res.data)
  },
  async getAllProductionLine({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllProductionLine', data)
      .then((res) => res.data)
  },
  async getAllEquipmentRentRate({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllEquipmentRentRate', data)
      .then((res) => res.data)
  },
  async getDropdownRentRate({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getDropdownRentRate', data)
      .then((res) => res.data)
  },
  async getSingleProductionLine({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getSingleProductionLine', data)
      .then((res) => res.data)
  },
  async deleteProductionLine({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteProductionLine', data)
      .then((res) => res.data)
  },
  async getSingleEquipmentRentRate({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getSingleEquipmentRentRate', data)
      .then((res) => res.data)
  },
  async getSingleEquipmentStock({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getSingleEquipmentStock', data)
      .then((res) => res.data)
  },
  async deleteEquipmentInfo({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteEquipmentInfo', data)
      .then((res) => res.data)
  },
  async createEquipmentInfo({ getters }, data) {
    return await this.$axios
      .post('api/admin/createEquipmentInfo', data)
      .then((res) => res.data)
  },
  async createEquipmentStock({ getters }, data) {
    return await this.$axios
      .post('api/admin/createEquipmentStock', data)
      .then((res) => res.data)
  },
  async deleteEquipmentStock({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteEquipmentStock', data)
      .then((res) => res.data)
  },
  async createEquipmentRentRate({ getters }, data) {
    return await this.$axios
      .post('api/admin/createEquipmentRentRate', data)
      .then((res) => res.data)
  },
  async deleteEquipmentRentRate({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteEquipmentRentRate', data)
      .then((res) => res.data)
  },
  async createProductionLine({ getters }, data) {
    return await this.$axios
      .post('api/admin/createProductionLine', data)
      .then((res) => res.data)
  },
  async updateEquipmentInfo({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateEquipmentInfo', data)
      .then((res) => res.data)
  },
  async updateEquipmentStock({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateEquipmentStock', data)
      .then((res) => res.data)
  },
  async updateEquipmentRentRate({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateEquipmentRentRate', data)
      .then((res) => res.data)
  },
  async updateProductionLine({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateProductionLine', data)
      .then((res) => res.data)
  },

  // async getAllEquipment({ getters }, data) {
  //     this.$axios.setHeader('authorization', this.$cookies.get('token'))
  //     return await this.$axios.get('api/admin/getAllEquipment', data).then((res) => res.data)
  // },
  // async getSingleEquipment({ getters }, data) {
  //     return await this.$axios.get('api/admin/getSingleEquipment', data).then((res) => res.data)
  // },
  // async createEquipment({ getters }, data) {
  //     return await this.$axios.post('api/admin/createEquipment', data).then((res) => res.data)
  // }, async updateEquipment({ getters }, data) {
  //     return await this.$axios.post('api/admin/updateEquipment', data).then((res) => res.data)
  // },

  // //Global Equipments
  // async getAllGlobalEquipment({ getters }, data) {
  //     this.$axios.setHeader('authorization', this.$cookies.get('token'))
  //     return await this.$axios.get('api/admin/getAllGlobalEquipment', data).then((res) => res.data)
  // },
  // async getSingleGlobalEquipment({ getters }, data) {
  //     return await this.$axios.get('api/admin/getSingleGlobalEquipment', data).then((res) => res.data)
  // },
  // async createGlobalEquipment({ getters }, data) {
  //     return await this.$axios.post('api/admin/createGlobalEquipment', data).then((res) => res.data)
  // },
  // async updateGlobalEquipment({ getters }, data) {
  //     return await this.$axios.post('api/admin/updateGlobalEquipment', data).then((res) => res.data)
  // },
  //User Types
  async getAllUserTypes({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllUserTypes', data)
      .then((res) => res.data)
  },
  async getSingleUserType({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleUserType', data)
      .then((res) => res.data)
  },
  async createUserType({ getters }, data) {
    return await this.$axios
      .post('api/admin/createUserType', data)
      .then((res) => res.data)
  },
  async updateUserType({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateUserType', data)
      .then((res) => res.data)
  },
  async deleteUserType({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteUserType', data)
      .then((res) => res.data)
  },
  //News
  async getAllNews({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllNews', data)
      .then((res) => res.data)
  },
  async getSingleNews({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleNews', data)
      .then((res) => res.data)
  },
  async createNews({ getters }, data) {
    return await this.$axios
      .post('api/admin/createNews', data)
      .then((res) => res.data)
  },
  async updateNews({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateNews', data)
      .then((res) => res.data)
  },
  async deleteNews({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteNews', data)
      .then((res) => res.data)
  },
  //Reserve
  async getAllReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllReserve', data)
      .then((res) => res.data)
  },
  async countReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/countReserve', data)
      .then((res) => res.data)
  },
  async getSingleReserve({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleReserve', data)
      .then((res) => res.data)
  },
  async createReserve({ getters }, data) {
    return await this.$axios
      .post('api/admin/createReserve', data)
      .then((res) => res.data)
  },
  async updateReserve({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateReserve', data)
      .then((res) => res.data)
  },
  async updateReserveEquipment({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateReserveEquipment', data)
      .then((res) => res.data)
  },
  async confirmReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/admin/confirmReserve', data)
      .then((res) => res.data)
  },
  async cancelReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/admin/cancelReserve', data)
      .then((res) => res.data)
  },
  async createQuotation({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/admin/createQuotation', data)
      .then((res) => res.data)
  },
  async deleteQuotation({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/admin/deleteQuotation', data)
      .then((res) => res.data)
  },
  async getSingleQuotation({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getSingleQuotation', data)
      .then((res) => res.data)
  },
  async deleteReserve({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteReserve', data)
      .then((res) => res.data)
  },
  //Service
  async getAllService({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllService', data)
      .then((res) => res.data)
  },
  async getSingleService({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleService', data)
      .then((res) => res.data)
  },
  async createService({ getters }, data) {
    return await this.$axios
      .post('api/admin/createService', data)
      .then((res) => res.data)
  },
  async updateService({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateService', data)
      .then((res) => res.data)
  },
  //Web info
  async getAllWebInfo({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllWebInfo', data)
      .then((res) => res.data)
  },
  async updateWebInfo({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateWebInfo', data)
      .then((res) => res.data)
  },
  //supply
  async getAllSupplyStock({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllSupplyStock', data)
      .then((res) => res.data)
  },
  async getSingleSupplyStock({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleSupplyStock', data)
      .then((res) => res.data)
  },
  async createSupplyStock({ getters }, data) {
    return await this.$axios
      .post('api/admin/createSupplyStock', data)
      .then((res) => res.data)
  },
  async updateSupplyStock({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateSupplyStock', data)
      .then((res) => res.data)
  },
  async deleteSupply({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteSupply', data)
      .then((res) => res.data)
  },
  //supplier
  async getAllSupplier({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllSupplier', data)
      .then((res) => res.data)
  },
  async getSingleSupplier({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleSupplier', data)
      .then((res) => res.data)
  },
  async createSupplier({ getters }, data) {
    return await this.$axios
      .post('api/admin/createSupplier', data)
      .then((res) => res.data)
  },
  async updateSupplier({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateSupplier', data)
      .then((res) => res.data)
  },
  async deleteSupplier({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteSupplier', data)
      .then((res) => res.data)
  },
  //report

  async getAllReport({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/admin/getAllReport', data)
      .then((res) => res.data)
  },
  async getAllReport({ getters }, data) {
    return await this.$axios
      .get('api/admin/getAllReport', data)
      .then((res) => res.data)
  },
  async deleteReport({ getters }, data) {
    return await this.$axios
      .post('api/admin/deleteReport', data)
      .then((res) => res.data)
  },
  async updateReport({ getters }, data) {
    return await this.$axios
      .post('api/admin/updateReport', data)
      .then((res) => res.data)
  },
  async getSingleReport({ getters }, data) {
    return await this.$axios
      .get('api/admin/getSingleReport', data)
      .then((res) => res.data)
  },
  // Dashboard
  async getDashboard({ getters }, data) {
    return await this.$axios
      .get('api/admin/getDashboard', data)
      .then((res) => res.data)
  },
}
