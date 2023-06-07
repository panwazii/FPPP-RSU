<template>
  <v-container>
    <div class="d-flex justify-end">
      <v-btn @click="registerDialog = true" class="mb-3" color="primary"
        ><v-icon medium> mdi-plus </v-icon>
        <h4>Add room</h4></v-btn
      >
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="rooms"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="totalPages"></v-pagination>
        <!-- <v-text-field
          :value="itemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
        ></v-text-field> -->
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
      title: 'manage room',
    }
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      page: 1,
      itemsPerPage: 10,
      totalPages: 0,
      search: '',
      rooms: [],
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: true,
          align: 'start',
        },
        {
          text: 'ชื่อห้อง',
          value: 'roomname',
          sortable: true,
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
    this.$store.dispatch('setPathName', 'manage room')
    this.fetchRooms()
  },
  watch: {
    page() {
      this.fetchRooms()
    },
  },
  methods: {
    async fetchRooms() {
      let Data = await this.$store.dispatch('api/admin/getAllRooms', {
        params: {
          limit: 5,
          page: this.page,
        },
      })
      console.log('this is room', Data)
      this.rooms = Data.rooms
      this.totalPages = Data.total_pages
    },
  },
}
</script>
