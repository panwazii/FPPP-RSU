<template>
  <div>
    <SharedBreadCrumbs title="รายการจองทั้งหมด" :routes="routes" />
    <v-row>
      <v-col cols="12" md="3">
        <v-card
          class="rounded-xl"
          :dark="getSelectedStatus(1)"
          @click="selectType(1)"
        >
          <div class="d-flex justify-center">
            <v-badge content="12" offset-x="20" offset-y="30">
              <v-card-title>Waiting</v-card-title>
            </v-badge>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
          class="rounded-xl"
          :dark="getSelectedStatus(2)"
          @click="selectType(2)"
        >
          <div class="d-flex justify-center">
            <v-badge content="12" offset-x="20" offset-y="30">
              <v-card-title>Return quotation</v-card-title>
            </v-badge>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
          class="rounded-xl"
          :dark="getSelectedStatus(3)"
          @click="selectType(3)"
        >
          <div class="d-flex justify-center">
            <v-badge content="12" offset-x="20" offset-y="30">
              <v-card-title>Return quotation</v-card-title>
            </v-badge>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card
          class="rounded-xl"
          :dark="getSelectedStatus(4)"
          @click="selectType(4)"
        >
          <div class="d-flex justify-center">
            <v-badge content="12" offset-x="20" offset-y="30">
              <v-card-title>Confirm</v-card-title>
            </v-badge>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <AdminBookingWaiting v-if="selectedType === 1" />
    <AdminBookingReturnQuotation v-if="selectedType === 2" />
    <AdminBookingConfirmQuotation v-if="selectedType === 3" />
    <AdminBookingConfirm v-if="selectedType === 4" />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'super-admin',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
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
  methods: {
    selectType(type) {
      this.selectedType = type
    },
    getSelectedStatus(id) {
      if (this.selectedType === id) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
