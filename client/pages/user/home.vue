<template>
  <div>
    <SharedBreadCrumbs title="รายการจองทั้งหมด" :routes="routes" />
    <!-- <v-row>
      <v-col cols="12" md="3">
        <v-card
          class="rounded-xl"
          :dark="getSelectedStatus(1)"
          @click="selectType(1)"
        >
          <div class="d-flex justify-center">
            <v-badge
              :content="String(reserveCount.waiting)"
              offset-x="20"
              offset-y="30"
            >
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
            <v-badge
              :content="String(reserveCount.return_quotation)"
              offset-x="20"
              offset-y="30"
            >
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
            <v-badge
              :content="String(reserveCount.confirm_quotation)"
              offset-x="20"
              offset-y="30"
            >
              <v-card-title>Confirm quotation</v-card-title>
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
            <v-badge
              :content="String(reserveCount.confirm)"
              offset-x="20"
              offset-y="30"
            >
              <v-card-title>Confirm</v-card-title>
            </v-badge>
          </div>
        </v-card>
      </v-col>
    </v-row> -->
    <div class="d-flex justify-space-between">
      <v-card
        class="rounded-xl mr-1"
        width="200"
        :dark="getSelectedStatus(1)"
        @click="selectType(1)"
      >
        <div class="d-flex justify-center">
          <v-badge
            :content="String(reserveCount.waiting)"
            offset-x="20"
            offset-y="30"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold">รอการตรวจสอบ</v-card-title>
          </v-badge>
        </div>
      </v-card>
      <v-card
        class="rounded-xl mx-1"
        width="200"
        :dark="getSelectedStatus(2)"
        @click="selectType(2)"
      >
        <div class="d-flex justify-center">
          <v-badge
            :content="String(reserveCount.return_quotation)"
            offset-x="20"
            offset-y="30"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold">ได้รับใบเสนอราคา</v-card-title>
          </v-badge>
        </div>
      </v-card>
      <v-card
        class="rounded-xl mx-1"
        width="200"
        :dark="getSelectedStatus(3)"
        @click="selectType(3)"
      >
        <div class="d-flex justify-center">
          <v-badge
            :content="String(reserveCount.confirm_quotation)"
            offset-x="20"
            offset-y="30"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold">รอการชำระเงิน</v-card-title>
          </v-badge>
        </div>
      </v-card>
      <v-card
        class="rounded-xl mx-1"
        width="200"
        :dark="getSelectedStatus(4)"
        @click="selectType(4)"
      >
        <div class="d-flex justify-center">
          <v-badge
            :content="String(reserveCount.confirm)"
            offset-x="20"
            offset-y="30"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold">สำเร็จ</v-card-title>
          </v-badge>
        </div>
      </v-card>
      <v-card
        class="rounded-xl ml-1"
        width="200"
        :dark="getSelectedStatus(5)"
        @click="selectType(5)"
      >
        <div class="d-flex justify-center">
          <v-badge
            :content="String(reserveCount.cancel)"
            offset-x="20"
            offset-y="30"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold">ยกเลิก</v-card-title>
          </v-badge>
        </div>
      </v-card>
    </div>
    <UserHomeWaiting v-if="selectedType === 1" />
    <UserHomeReturnQuotation v-if="selectedType === 2" />
    <UserHomeConfirmQuotation v-if="selectedType === 3" />
    <UserHomeConfirm v-if="selectedType === 4" />
    <UserHomeCancel v-if="selectedType === 5" />
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
  async fetch() {
    const countReserve = await this.$store.dispatch('api/user/countReserve')
    this.reserveCount = countReserve.count_reserve
  },
  computed: {},
  data() {
    return {
      reserveCount: {},
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
