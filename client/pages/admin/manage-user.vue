<template>
  <v-container>
    <AdminEditUser
      :open="editUser"
      :data="user"
      :editUser.sync="editUser"
      v-if="user"
    />
    <AdminCreateUser :open="createUser" :createUser.sync="createUser" />
    <div class="d-flex justify-end">
      <v-btn @click="createUser = true" class="mb-3" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>Add user</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="users"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditUserModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteUser(item)">
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
      title: 'manage user',
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
      users: [],
      user: null,
      newUser: null,
      editUser: false,
      createUser: false,
      headers: [
        {
          text: 'fname',
          value: 'fname',
          sortable: false,
          align: 'start',
        },
        {
          text: 'lname',
          value: 'lname',
          sortable: false,
          align: 'start',
        },
        {
          text: 'email',
          value: 'email',
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
    this.$store.dispatch('setPathName', 'manage user')
    this.fetchUsers()
  },
  watch: {
    page() {
      this.fetchUsers()
    },
  },
  methods: {
    async fetchUsers() {
      let Data = await this.$store.dispatch('api/admin/getAllUsers', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      this.users = Data.users
      this.totalPages = Data.total_pages
    },
    async openEditUserModal(id) {
      const UserData = await this.$store.dispatch('api/admin/getSingleUser', {
        params: {
          id: id,
        },
      })
      this.user = UserData.user
      this.editUser = true
    },
  },
}
</script>
