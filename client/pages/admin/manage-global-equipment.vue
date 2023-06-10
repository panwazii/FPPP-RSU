<template>
  <v-container>
    <AdminEditGlobalEquipment
      :open="editGlobalEquipment"
      :data="globalequipment"
      :editGlobalEquipment.sync="editGlobalEquipment"
      v-if="globalequipment"
    />
    <AdminCreateGlobalEquipment
      :open="createGlobalEquipment"
      :createGlobalEquipment.sync="createGlobalEquipment"
    />
    <div class="d-flex justify-end">
      <v-btn @click="createGlobalEquipment = true" class="mb-3" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>Add Global Equipment</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="globalequipments"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="openEditGlobalEquipmentModal(item.id)"
          >
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
      title: 'manage equipment',
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
      globalequipments: [],
      globalequipment: null,
      newEquipment: null,
      editGlobalEquipment: false,
      createGlobalEquipment: false,
      headers: [
        {
          text: 'ชื่อเครื่องมือ',
          value: 'name',
          sortable: false,
          align: 'start',
        },
        {
          text: 'Price',
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
    this.$store.dispatch('setPathName', 'manage equipment')
    this.fetchGlobalEquipment()
  },
  watch: {
    page() {
      this.fetchGlobalEquipment()
    },
  },
  methods: {
    async fetchGlobalEquipment() {
      let Data = await this.$store.dispatch('api/admin/getAllGlobalEquipment', {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      })
      console.log('this is equipment', Data)
      this.globalequipments = Data.globalequipment
      this.totalPages = Data.total_pages
    },
    async openEditGlobalEquipmentModal(id) {
      const EquipmentData = await this.$store.dispatch(
        'api/admin/getSingleGlobalEquipment',
        {
          params: {
            id: id,
          },
        }
      )
      this.equipment = EquipmentData.global_equipment
      this.editGlobalEquipment = true
    },
  },
}
</script>
