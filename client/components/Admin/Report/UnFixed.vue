<template>
  <v-container>
    <AdminReportEdit
      :open="editDialog"
      :data="report"
      :method="fetchAllReport"
      :editDialog.sync="editDialog"
      v-if="report"
    />
    <div>
      <v-data-table
        :headers="headers"
        :items="AllReport"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditRoomModal(item.id)">
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
      title: 'manage report',
    }
  },
  data() {
    return {
      selectedType: 1,
      reserveCount: {
        waiting: 0,
        return_quotation: 0,
        confirm_quotation: 0,
        confirm: 0,
        cancel: 0,
      },
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      AllReport: [],
      report: null,
      editReport: false,
      createReport: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'id',
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
    this.$store.dispatch('setPathName', 'จัดการรายงาน')
    this.fetchAllReport()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchAllReport()
    },
  },
  methods: {
    async fetchAllReport() {
      let Data = await this.$store.dispatch('api/admin/getAllReport', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      this.AllReport = Data.report.rows
      this.fetchOption.totalPages = Data.total_pages
      console.log('this is Report', Data)
    },
    async openEditReportModal(id) {
      const ReportData = await this.$store.dispatch(
        'api/admin/getSingleReport',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', ReportData)
      this.report = ReportData.report
      this.editDialog = true
    },
  },
}
</script>
