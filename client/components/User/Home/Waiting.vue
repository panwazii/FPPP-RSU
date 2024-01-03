<template>
  <div>
    <v-card min-height="550" class="rounded-xl mt-2 card">
      <div>
        <v-card class="rounded-xl mt-5">
          <v-row class="d-flex mx-5"><h3>กำลังดำเนินการจอง</h3></v-row>
          <v-row no-gutters class="flex-nowrap bg-surface-variant">
            <v-col
              cols="12"
              md="3"
              style="min-width: 100px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>ห้องที่จอง</v-card-title>
              <v-card-subtitle> ROOM_NAME </v-card-subtitle>
            </v-col>
            <v-col
              cols="12"
              md="3"
              style="min-width: 100px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>เครื่องมือที่จอง</v-card-title>
              <v-card-subtitle>10 อัน</v-card-subtitle>
            </v-col>
            <v-col
              cols="12"
              md="3"
              style="min-width: 100px"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>จองห้องพร้อมเครื่องมือ</v-card-title>
              <v-card-subtitle>Room Name - เครื่องมือ 10 อัน</v-card-subtitle>
            </v-col>

            <v-col
              cols="1"
              style="min-width: 100px"
              class="flex-grow-0 flex-shrink-1 mt-9"
            >
              <v-btn color="blue" class="ma-2 pa-2 align-self-center rounded-xl"
                >ดูเพิ่มเติม</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <v-card class="rounded-xl mt-5" height="100%">
          <v-row class="d-flex mx-5"><h3>กำลังดำเนินการจอง</h3></v-row>
          <v-row no-gutters class="flex-nowrap bg-surface-variant">
            <v-col
              cols="3"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>ห้องที่จอง</v-card-title>
              <v-card-subtitle> ROOM_NAME </v-card-subtitle>
            </v-col>
            <v-col
              cols="3"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>เครื่องมือที่จอง</v-card-title>
              <v-card-subtitle>10 อัน</v-card-subtitle>
            </v-col>
            <v-col
              cols="3"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card-title>จองห้องพร้อมเครื่องมือ</v-card-title>
              <v-card-subtitle>Room Name - เครื่องมือ 10 อัน</v-card-subtitle>
            </v-col>

            <v-col
              cols="1"
              style="min-width: 100px"
              class="flex-grow-0 flex-shrink-1 mt-9"
            >
              <v-btn color="blue" class="ma-2 pa-2 align-self-center rounded-xl"
                >ดูเพิ่มเติม</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </div>

      <v-pagination
        circle
        dark
        class="mt-2"
        v-model="fetchOption.page"
        :length="fetchOption.totalPages"
      >
      </v-pagination>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {},
  data() {
    return {
      reserve: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      routes: [{ id: 1, name: 'หน้าหลัก', to: '/' }],
      selectedType: 1,
    }
  },
  methods: {},
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
