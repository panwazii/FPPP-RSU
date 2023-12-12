<template>
  <v-container>
    <AdminEquipmentRentRateEdit
      :open="editEquipmentRentRate"
      :data="equipmentrentrate"
      :editEquipmentRentRate.sync="editEquipmentRentRate"
      v-if="equipmentrentrate"
    />
    <AdminEquipmentRentRateCreate
      :open="createEquipmentRentRate"
      :createEquipmentRentRate.sync="createEquipmentRentRate"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createEquipmentRentRate = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มอัตราค่าเช่า</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="equipmentrentrates"
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
            @click="openEditEquipmentRentRateModal(item.id)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteEquipmentRentRate(item)">
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
      title: 'จัดการอัตราค่าเช่า',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      equipmentrentrates: [],
      equipmentrentrate: null,
      newEquipmentRentRate: null,
      editEquipmentRentRate: false,
      createEquipmentRentRate: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'หน่วย',
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
    this.$store.dispatch('setPathName', 'จัดการอัตราค่าเช่า')
    this.fetchEquipmentRentRates()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchEquipmentRentRates()
    },
  },
  methods: {
    async fetchEquipmentRentRates() {
      let Data = await this.$store.dispatch(
        'api/admin/getAllEquipmentRentRate',
        {
          params: {
            limit: this.fetchOption.itemsPerPage,
            page: this.fetchOption.page,
          },
        }
      )
      console.log('this is equipmentrentrate', Data)
      this.equipmentrentrates = Data.equipment_rent_rates
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditEquipmentRentRateModal(id) {
      const EquipmentRentRateData = await this.$store.dispatch(
        'api/admin/getSingleEquipmentRentRate',
        {
          params: {
            id: id,
          },
        }
      )
      console.log('here', EquipmentRentRateData)
      this.equipmentrentrate = EquipmentRentRateData.equipment_rent_rate
      this.editEquipmentRentRate = true
    },
  },
}
</script>
