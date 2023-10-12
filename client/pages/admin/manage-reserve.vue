<template>
    <v-container>
      <AdminEditReserve
        :open="editReserve"
        :data="reserve"
        :editReserve.sync="editReserve"
        v-if="reserve"
      />
      <AdminCreateReserve
        :open="createReserve"
        :createReserve.sync="createReserve"
      />
      <div class="d-flex justify-end">
        <v-btn @click="createReserve = true" class="mb-3" color="primary">
          <v-icon medium> mdi-plus </v-icon>
          <h4>Add Reserve</h4>
        </v-btn>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="reserves"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
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
        title: 'manage reserve',
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
        reserves: [],
        reserve: null,
        newReserve: null,
        editReserve: false,
        createReserve: false,
        headers: [
          {
            text: 'title',
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
      this.$store.dispatch('setPathName', 'manage reserve')
      this.fetchReserves()
    },
    watch: {
      page() {
        this.fetchReserves()
      },
    },
    methods: {
      async fetchReserves() {
        let Data = await this.$store.dispatch('api/admin/getAllReserve', {
          params: {
            limit: this.itemsPerPage,
            page: this.page,
          },
        })
        console.log('this is reserve', Data)
        this.reserves = Data.reserve
        this.totalPages = Data.total_pages
      },
      async openEditReserveModal(id) {
        const ReserveData = await this.$store.dispatch('api/admin/getSingleReserve', {
          params: {
            id: id,
          },
        })
        console.log('here', ReserveData);
        this.reserve = ReserveData.Data
        this.editReserve = true
      },
    },
  }
  </script>
  