<template>
  <v-container>
    <AdminUserTypeEdit
      :open="editUserType"
      :data="userType"
      :method="fetchUserTypes"
      :editUserType.sync="editUserType"
      v-if="userType"
    />
    <AdminUserTypeCreate
      :open="createUserType"
      :method="fetchUserTypes"
      :createUserType.sync="createUserType"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createUserType = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มประเภทผู้ใช้</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="userTypes"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
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
      title: 'จัดการประเภทผู้ใช้',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      userTypes: [],
      userType: null,
      newUserType: null,
      editUserType: false,
      createUserType: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'ไอดี',
          value: 'id',
          sortable: true,
          align: 'start',
        },
        {
          text: 'ประเภท',
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
    this.$store.dispatch('setPathName', 'จัดการประเภทผู้ใช้')
    this.fetchUserTypes()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchUserTypes()
    },
  },
  methods: {
    async fetchUserTypes() {
      let Data = await this.$store.dispatch('api/admin/getAllUserTypes', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.userTypes = Data.user_types
      this.fetchOption.totalPages = Data.totalpages
    },
    async openEditUserTypeModal(id) {
      const UserTypeData = await this.$store.dispatch(
        'api/admin/getSingleUserType',
        {
          params: {
            id: id,
          },
        }
      )
      this.userType = UserTypeData.user_type
      this.editUserType = true
    },
  },
}
</script>
