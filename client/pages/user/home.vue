<template>
  <div>
    <SharedBreadCrumbs title="รายการจองทั้งหมด" :routes="routes" />
    <v-card min-height="1250" class="rounded-xl">
      <v-card-text>
        <div class="d-flex">
          <v-text-field
            v-model="search.value"
            class="rounded-xl mx-2"
            prepend-inner-icon="mdi-magnify"
            solo
            label="ค้นหารายการจอง"
          />
          <div class="d-flex">
            <v-btn height="48" dark class="rounded-xl mr-2"
              >ค้นหา</v-btn
            >
            <v-btn height="48" class="rounded-xl mr-2"
              >ล้างค่า</v-btn
            >
          </div>
        </div>
        <div v-if="reserve.length === 0" class="mt-10">
          <div class="d-flex justify-center text-subtitle-1">ไม่พบข้อมูล</div>
          <v-divider class="mx-10"></v-divider>
        </div>
        <v-row>
          <v-col
            justify="center"
            align="center"
            v-for="room in reserve"
            :key="room.id"
            cols="12"
            md="3"
          >
            <UserRoomsCard
              :id="room.id"
              :title="room.name"
              :picture="room.picture"
              :price="room.rent_price"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-pagination
      circle
      dark
      class="mt-2 justify-center"
      v-model="fetchOption.page"
      :length="fetchOption.totalPages"
    >
    </v-pagination>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
  data() {
    return {
      reserve: [],
      search: { value: '', filter: 1 },
      fetchOption: { page: 1, totalPages: 0, itemsPerPage: 12 },
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/' },
      ],
    }
  }
}
</script>
