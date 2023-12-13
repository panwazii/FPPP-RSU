<template>
  <v-container>
    <AdminReserveEdit
      :open="editReserve"
      :data="reserve"
      :method="fetchReserves"
      :editReserve.sync="editReserve"
      v-if="reserve"
    />
    <AdminReserveCreate
      :open="createReserve"
      :data="fetchReserves"
      :createReserve.sync="createReserve"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createReserve = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มการจอง</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="reserves"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditReserveModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteReserve(item)">
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
      title: 'จัดการการจอง',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      reserves: [],
      reserve: null,
      newReserve: null,
      editReserve: false,
      createReserve: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'ไอดี',
          value: 'id',
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
    this.$store.dispatch('setPathName', 'จัดการการจอง')
    this.fetchReserves()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchReserves()
    },
  },
  methods: {
    async fetchReserves() {
      let Data = await this.$store.dispatch('api/admin/getAllReserve', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is reserve', Data)
      this.reserves = Data.reserves
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditReserveModal(id) {
      const ReserveData = await this.$store.dispatch(
        'api/admin/getSingleReserve',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', ReserveData)
      this.reserve = ReserveData.reserve
      this.editReserve = true
    },
  },
}
</script>
