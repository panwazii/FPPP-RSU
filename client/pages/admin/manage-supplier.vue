<template>
  <v-container>
    <AdminSupplierEdit
      :open="editSupplier"
      :data="supplier"
      :editSupplier.sync="editSupplier"
      v-if="supplier"
    />
    <AdminSupplierCreate
      :open="createSupplier"
      :createSupplier.sync="createSupplier"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createSupplier = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มผู้ผลิต</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="suppliers"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
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
      title: 'จัดการผู้ผลิต',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      suppliers: [],
      supplier: null,
      newSupplier: null,
      editSupplier: false,
      createSupplier: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'ชื่อ',
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
    this.$store.dispatch('setPathName', 'จัดการผู้ผลิต')
    this.fetchSuppliers()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchSuppliers()
    },
  },
  methods: {
    async fetchSuppliers() {
      let Data = await this.$store.dispatch('api/admin/getAllSupplier', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is supplier', Data)
      this.suppliers = Data.suppliers
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditSupplierModal(id) {
      const SupplierData = await this.$store.dispatch(
        'api/admin/getSingleSupplier',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', SupplierData)
      this.supplier = SupplierData.supplier
      this.editSupplier = true
    },
  },
}
</script>
