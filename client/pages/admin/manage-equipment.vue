<template>
  <v-container>
    <AdminEquipmentEdit
      :open="editEquipment"
      :data="equipment"
      :editEquipment.sync="editEquipment"
      v-if="equipment"
    />
    <AdminEquipmentCreate
      :open="createEquipment"
      :createEquipment.sync="createEquipment"
    />
    <div class="d-flex justify-end">
      <v-btn
        @click="createEquipment = true"
        class="mb-3 rounded-xl"
        color="primary"
      >
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มเครื่องมือ</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="equipments"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditEquipmentModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteEquipment(item)">
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
      title: 'จัดการเครื่องมือ',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      equipments: [],
      equipment: null,
      newEquipment: null,
      editEquipment: false,
      createEquipment: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'ชื่อเครื่องมือ',
          value: 'name',
          sortable: false,
          align: 'start',
        },
        {
          text: 'ราคายืม',
          value: 'rent_price',
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
    this.$store.dispatch('setPathName', 'จัดการเครื่องมือ')
    this.fetchEquipment()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchEquipment()
    },
  },
  methods: {
    async fetchEquipment() {
      let Data = await this.$store.dispatch('api/admin/getAllEquipmentInfo', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
          filter: 0,
          value: '',
        },
      })
      console.log('this is equipment', Data)
      this.equipments = Data.equipments
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditEquipmentModal(id) {
      const EquipmentData = await this.$store.dispatch(
        'api/admin/getSingleEquipmentInfo',
        {
          params: {
            id: id,
          },
        }
      )
      this.equipment = EquipmentData.equipment
      this.editEquipment = true
    },
  },
}
</script>
