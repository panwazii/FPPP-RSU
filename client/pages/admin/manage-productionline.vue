<template>
    <v-container>
      <AdminProductionLineEdit
        :open="editProductionLine"
        :data="productionline"
        :editProductionLine.sync="editProductionLine"
        v-if="productionline"
      />
      <AdminProductionLineCreate
        :open="createProductionLine"
        :createProductionLine.sync="createProductionLine"
      />
      <div class="d-flex justify-end">
        <v-btn @click="createProductionLine = true" class="mb-3" color="primary">
          <v-icon medium> mdi-plus </v-icon>
          <h4>Add production line</h4>
        </v-btn>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="productionlines"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon small class="mr-2" @click="openEditProductionLineModal(item.id)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon small class="mr-2" @click="deleteProductionLine(item)">
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
        title: 'manage production line',
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
        productionlines: [],
        productionline: null,
        newProductionLine: null,
        editProductionLine: false,
        createProductionLine: false,
        headers: [
          {
            text: 'name',
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
      this.$store.dispatch('setPathName', 'manage productionline')
      this.fetchProductionLines()
    },
    watch: {
      page() {
        this.fetchProductionLines()
      },
    },
    methods: {
      async fetchProductionLines() {
        let Data = await this.$store.dispatch('api/admin/getAllProductionLine', {
          params: {
            limit: this.itemsPerPage,
            page: this.page,
          },
        })
        console.log('this is productionline', Data)
        this.productionlines = Data.production_lines
        this.totalPages = Data.total_pages
      },
      async openEditProductionLineModal(id) {
        const ProductionLineData = await this.$store.dispatch('api/admin/getSingleProductionLine', {
          params: {
            id: id,
          },
        })
        console.log('here', ProductionLineData);
        this.productionline = ProductionLineData.production_line
        this.editProductionLine = true
      },
    },
  }
  </script>
  