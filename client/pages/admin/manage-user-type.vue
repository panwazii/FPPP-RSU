<template>
  <v-container>
    <AdminUserTypeEdit
      :open="editUserType"
      :data="userType"
      :editUserType.sync="editUserType"
      v-if="userType"
    />
    <AdminUserTypeCreate
      :open="createUserType"
      :createUserType.sync="createUserType"
    />
    <div class="d-flex justify-end">
      <v-btn @click="createUserType = true" class="mb-3" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>Add User Type</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="userTypes"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditUserTypeModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteRoom(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="totalPages"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'manage room',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      page: 1,
      itemsPerPage: 7,
      totalPages: 0,
      search: '',
      userTypes: [],
      userType: null,
      newUserType: null,
      editUserType: false,
      createUserType: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: true,
          align: 'start',
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false,
          align: 'start',
        },
        { text: 'แก้ไข', value: 'edit', sortable: false, align: 'center' },
        {
          text: 'ลบ',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'manage user type')
    this.fetchUserTypes()
  },
  watch: {
    page() {
      this.fetchUserTypes()
    },
  },
  methods: {
    async fetchUserTypes() {
      let Data = await this.$store.dispatch('api/admin/getAllUserTypes', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      this.userTypes = Data.user_types
      this.totalPages = Data.totalpages
    },
    async openEditUserTypeModal(id) {
      const UserTypeData = await this.$store.dispatch('api/admin/getSingleUserType', {
        params: {
          id: id,
        },
      })
      this.userType = UserTypeData.user_type
      this.editUserType = true
    },
  },
}
</script>
