<template>
  <v-container>
    <AdminUserEdit
      :open="editUser"
      :data="user"
      :method="fetchUsers"
      :editUser.sync="editUser"
      v-if="user"
    />
    <AdminUserCreate
      :open="createUser"
      :createUser.sync="createUser"
      :method="fetchUsers"
    />
    <div class="d-flex justify-end">
      <v-btn @click="createUser = true" class="mb-3 rounded-xl" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มผู้ใช้</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="users"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
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
        <v-pagination
          class="rounded-xl"
          v-model="fetchOption.page"
          :length="fetchOption.totalPages"
        ></v-pagination>
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
      title: 'จัดการผู้ใช้',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      users: [],
      user: null,
      newUser: null,
      editUser: false,
      createUser: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 7 },
      headers: [
        {
          text: 'ชื่อ',
          value: 'fname',
          sortable: false,
          align: 'start',
        },
        {
          text: 'นามสกุล',
          value: 'lname',
          sortable: false,
          align: 'start',
        },
        {
          text: 'อีเมล',
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
    this.$store.dispatch('setPathName', 'จัดการผู้ใช้')
    this.fetchUsers()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchUsers()
    },
  },
  methods: {
    async fetchUsers() {
      let Data = await this.$store.dispatch('api/admin/getAllUsers', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.users = Data.users
      this.fetchOption.totalPages = Data.total_pages
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
