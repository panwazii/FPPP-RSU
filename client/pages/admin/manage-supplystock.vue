<template>
  <v-container>
    <AdminSupplyStockEdit
      :open="editSupplyStock"
      :data="supplystock"
      :method="fetchSupplyStocks"
      :editSupplyStock.sync="editSupplyStock"
      v-if="supplystock"
    />
    <AdminSupplyStockCreate
      :open="createSupplyStock"
      :method="fetchSupplyStocks"
      :createSupplyStock.sync="createSupplyStock"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createSupplyStock = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่ม</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="supplystocks"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
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
      title: 'manage supplystock',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      supplystocks: [],
      supplystock: null,
      newSupplyStock: null,
      editSupplyStock: false,
      createSupplyStock: false,
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
    this.$store.dispatch('setPathName', 'manage supplystock')
    this.fetchSupplyStocks()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchSupplyStocks()
    },
  },
  methods: {
    async fetchSupplyStocks() {
      let Data = await this.$store.dispatch('api/admin/getAllSupplyStock', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is supplystock', Data)
      this.supplystocks = Data.supply_stocks
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditSupplyStockModal(id) {
      const SupplyStockData = await this.$store.dispatch(
        'api/admin/getSingleSupplyStock',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', SupplyStockData)
      this.supplystock = SupplyStockData.supply_stock
      this.editSupplyStock = true
    },
  },
}
</script>
