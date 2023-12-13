<template>
  <v-container>
    <AdminEquipmentStockEdit
      :open="editEquipmentStock"
      :data="equipmentstock"
      :method="fetchEquipmentStocks"
      :editEquipmentStock.sync="editEquipmentStock"
      v-if="equipmentstock"
    />
    <AdminEquipmentStockCreate
      :open="createEquipmentStock"
      :method="fetchEquipmentStocks"
      :createEquipmentStock.sync="createEquipmentStock"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createEquipmentStock = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มสต็อคอุปกรณ์</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="equipmentstocks"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="openEditEquipmentStockModal(item.id)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteEquipmentStock(item)">
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
      title: 'จัดการสต็อคอุปกรณ์',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      equipmentstocks: [],
      equipmentstock: null,
      newEquipmentStock: null,
      editEquipmentStock: false,
      createEquipmentStock: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'หมายเลขซีเรียล',
          value: 'serial_number',
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
    this.$store.dispatch('setPathName', 'จัดการสต็อคอุปกรณ์')
    this.fetchEquipmentStocks()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchEquipmentStocks()
    },
  },
  methods: {
    async fetchEquipmentStocks() {
      let Data = await this.$store.dispatch('api/admin/getAllEquipmentStock', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is equipmentstock', Data)
      this.equipmentstocks = Data.equipment_stocks
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditEquipmentStockModal(id) {
      const EquipmentStockData = await this.$store.dispatch(
        'api/admin/getSingleEquipmentStock',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', EquipmentStockData)
      this.equipmentstock = EquipmentStockData.equipment_stock
      this.editEquipmentStock = true
    },
  },
}
</script>
