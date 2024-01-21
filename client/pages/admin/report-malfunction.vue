<template>
  <v-container>
    <div class="mb-4">
      <v-row>
        <v-col cols="4"
          ><v-card
            class="rounded-xl"
            :dark="getSelectedStatus(1)"
            @click="selectType(1)"
          >
            <div class="d-flex justify-center">
              <v-badge offset-x="20" offset-y="30">
                <v-card-title class="text-subtitle-1 font-weight-bold"
                  >ยังไม่ซ่อมแซม</v-card-title
                >
              </v-badge>
            </div>
          </v-card></v-col
        >
        <v-col cols="4"
          ><v-card
            class="rounded-xl"
            :dark="getSelectedStatus(2)"
            @click="selectType(2)"
          >
            <div class="d-flex justify-center">
              <v-badge offset-x="20" offset-y="30">
                <v-card-title class="text-subtitle-1 font-weight-bold"
                  >ซ่อมแซมแล้ว</v-card-title
                >
              </v-badge>
            </div>
          </v-card></v-col
        >
        <v-col cols="4"
          ><v-card
            class="rounded-xl"
            :dark="getSelectedStatus(3)"
            @click="selectType(3)"
          >
            <div class="d-flex justify-center">
              <v-badge offset-x="20" offset-y="30">
                <v-card-title class="text-subtitle-1 font-weight-bold"
                  >ทั้งหมด</v-card-title
                >
              </v-badge>
            </div>
          </v-card></v-col
        >
      </v-row>
    </div>
    <AdminReportUnFixed v-if="selectedType === 1" />
    <AdminReportFixed v-if="selectedType === 2" />
    <AdminReportAllReport v-if="selectedType === 3" />
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
      selectedType: 1,
      reserveCount: {
        waiting: 0,
        return_quotation: 0,
        confirm_quotation: 0,
        confirm: 0,
        cancel: 0,
      },
    }
  },
  mounted() {
    this.$store.dispatch('setPathName', 'จัดการรายงาน')
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
