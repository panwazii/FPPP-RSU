export const actions = {
  async getSingleReserve({ getters }, data) {
    return await this.$axios
      .get('api/user/getSingleReserve', data)
      .then((res) => res.data)
  },
  async getAllReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/getAllReserve', data)
      .then((res) => res.data)
  },
  async countReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/countReserve', data)
      .then((res) => res.data)
  },
  async createReserve({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/user/createReserve', data)
      .then((res) => res.data)
  },
  //cart
  async getAllCart({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/getAllCart', data)
      .then((res) => res.data)
  },
  async createCart({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/user/createCart', data)
      .then((res) => res.data)
  },
  async getUserInfo({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/getUserInfo', data)
      .then((res) => res.data)
  },
  async getAllEquipmentInfoInRoom({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/getAllEquipmentInfoInRoom', data)
      .then((res) => res.data)
  },
  //Quotation
  async getSingleQuotation({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .get('api/user/getSingleQuotation', data)
      .then((res) => res.data)
  },
  async confirmPrice({ getters }, data) {
    this.$axios.setHeader('authorization', this.$cookies.get('token'))
    return await this.$axios
      .post('api/user/confirmPrice', data)
      .then((res) => res.data)
  },
}
