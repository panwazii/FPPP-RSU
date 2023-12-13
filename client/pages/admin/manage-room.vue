<template>
  <v-container>
    <AdminRoomEdit
      :open="editRoom"
      :data="room"
      :method="fetchRooms"
      :editRoom.sync="editRoom"
      v-if="room"
    />
    <AdminRoomCreate
      :open="createRoom"
      :method="fetchRooms"
      :createRoom.sync="createRoom"
    />
    <div class="d-flex justify-end">
      <v-btn @click="createRoom = true" class="mb-3 rounded-xl" color="primary">
        <v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มห้อง</h4>
      </v-btn>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="rooms"
        :page.sync="fetchOption.page"
        :items-per-page="fetchOption.itemsPerPage"
        hide-default-footer
        class="elevation-1 rounded-xl"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon small class="mr-2" @click="openEditRoomModal(item.id)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon small class="mr-2" @click="deleteRoom(item)">
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
      title: 'จัดการห้อง',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      search: '',
      rooms: [],
      room: null,
      newRoom: null,
      editRoom: false,
      createRoom: false,
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      headers: [
        {
          text: 'ชื่อห้อง',
          value: 'name',
          sortable: false,
          align: 'start',
        },
        {
          text: 'ค่าเช่า',
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
    this.$store.dispatch('setPathName', 'จัดการห้อง')
    this.fetchRooms()
  },
  watch: {
    'fetchOption.page'() {
      this.fetchRooms()
    },
  },
  methods: {
    async fetchRooms() {
      let Data = await this.$store.dispatch('api/admin/getAllRooms', {
        params: {
          limit: this.fetchOption.itemsPerPage,
          page: this.fetchOption.page,
        },
      })
      console.log('this is room', Data)
      this.rooms = Data.rooms
      this.fetchOption.totalPages = Data.total_pages
    },
    async openEditRoomModal(id) {
      const RoomData = await this.$store.dispatch('api/admin/getSingleRoom', {
        params: {
          id: id,
        },
      })
      console.log('here', RoomData)
      this.room = RoomData.room[0]
      this.editRoom = true
    },
  },
}
</script>
