<template>
  <v-container>
    <AdminServiceEdit
      :open="editService"
      :data="service"
      :method="fetchServices"
      :editService.sync="editService"
      v-if="service"
    />
    <AdminServiceCreate
      :open="createService"
      :method="fetchServices"
      :createService.sync="createService"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createService = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มรายการบริการ</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="services"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditServiceModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteService(item)">
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
      title: 'จัดการรายการบริการ',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      services: [],
      service: null,
      newService: null,
      editService: false,
      createService: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'บริการ',
          value: 'title',
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
    this.$store.dispatch('setPathName', 'จัดการรายการบริการ')
    this.fetchServices()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchServices()
    },
  },
  methods: {
    async fetchServices() {
      let Data = await this.$store.dispatch('api/admin/getAllService', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is service', Data)
      this.services = Data.services
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditServiceModal(id) {
      const ServiceData = await this.$store.dispatch(
        'api/admin/getSingleService',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', ServiceData)
      this.service = ServiceData.service
      this.editService = true
    },
  },
}
</script>
