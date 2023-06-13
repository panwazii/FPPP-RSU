export const actions = {
    async getAllUserTypesDropdown({ getters }, data) {
        return await this.$axios.get('api/public/getAllUserTypesDropdown', data).then((res) => res.data)
    },

}