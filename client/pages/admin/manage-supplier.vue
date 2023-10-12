<template>
    <v-container>
      <AdminEditSupplier
        :open="editSupplier"
        :data="supplier"
        :editSupplier.sync="editSupplier"
        v-if="supplier"
      />
      <AdminCreateSupplier
        :open="createSupplier"
        :createSupplier.sync="createSupplier"
      />
      <div class="d-flex justify-end">
        <v-btn @click="createSupplier = true" class="mb-3" color="primary">
          <v-icon medium> mdi-plus </v-icon>
          <h4>Add Supplier</h4>
        </v-btn>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="suppliers"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon small class="mr-2" @click="openEditSupplierModal(item.id)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon small class="mr-2" @click="deleteSupplier(item)">
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
        title: 'manage supplier',
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
        suppliers: [],
        supplier: null,
        newSupplier: null,
        editSupplier: false,
        createSupplier: false,
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
      this.$store.dispatch('setPathName', 'manage supplier')
      this.fetchSuppliers()
    },
    watch: {
      page() {
        this.fetchSuppliers()
      },
    },
    methods: {
      async fetchSuppliers() {
        let Data = await this.$store.dispatch('api/admin/getAllSupplier', {
          params: {
            limit: this.itemsPerPage,
            page: this.page,
          },
        })
        console.log('this is supplier', Data)
        this.suppliers = Data.supplier
        this.totalPages = Data.total_pages
      },
      async openEditSupplierModal(id) {
        const SupplierData = await this.$store.dispatch('api/admin/getSingleSupplier', {
          params: {
            id: id,
          },
        })
        console.log('here', SupplierData);
        this.supplier = SupplierData.Data
        this.editSupplier = true
      },
    },
  }
  </script>
  