<template>
    <v-container>
      <AdminEditSupplyStock
        :open="editSupplyStock"
        :data="supplystock"
        :editSupplyStock.sync="editSupplyStock"
        v-if="supplystock"
      />
      <AdminCreateSupplyStock
        :open="createSupplyStock"
        :createSupplyStock.sync="createSupplyStock"
      />
      <div class="d-flex justify-end">
        <v-btn @click="createSupplyStock = true" class="mb-3" color="primary">
          <v-icon medium> mdi-plus </v-icon>
          <h4>Add Supply Stock</h4>
        </v-btn>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="supplystocks"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon small class="mr-2" @click="openEditSupplyStockModal(item.id)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon small class="mr-2" @click="deleteSupplyStock(item)">
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
        title: 'manage supplystock',
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
        supplystocks: [],
        supplystock: null,
        newSupplyStock: null,
        editSupplyStock: false,
        createSupplyStock: false,
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
      this.$store.dispatch('setPathName', 'manage supplystock')
      this.fetchSupplyStocks()
    },
    watch: {
      page() {
        this.fetchSupplyStocks()
      },
    },
    methods: {
      async fetchSupplyStocks() {
        let Data = await this.$store.dispatch('api/admin/getAllSupplyStock', {
          params: {
            limit: this.itemsPerPage,
            page: this.page,
          },
        })
        console.log('this is supplystock', Data)
        this.supplystocks = Data.supply
        this.totalPages = Data.total_pages
      },
      async openEditSupplyStockModal(id) {
        const SupplyStockData = await this.$store.dispatch('api/admin/getSingleSupplyStock', {
          params: {
            id: id,
          },
        })
        console.log('here', SupplyStockData);
        this.supplystock = SupplyStockData.Data
        this.editSupplyStock = true
      },
    },
  }
  </script>
  