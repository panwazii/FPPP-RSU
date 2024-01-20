<template>
  <div>
    <v-card-title class="font-weight-bold"> ยืนยันข้อมูล </v-card-title>
    <v-card-subtitle class="subtitle-1 mb-4">
      โปรดเช็ครายละเอียดก่อนกดส่งข้อมูลการจอง
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <p class="mb-0 subtitle-2 font-weight-bold">ชื่อจริง</p>
          <p class="subtitle-1">{{ userData.fname }}</p>
        </v-col>
        <v-col cols="12" md="4">
          <p class="mb-0 subtitle-2 font-weight-bold">นามสกุล</p>
          <p class="subtitle-1">{{ userData.lname }}</p>
        </v-col>
        <v-col cols="12" md="4">
          <p class="mb-0 subtitle-2 font-weight-bold">เบอร์ติดต่อ</p>
          <p class="subtitle-1">{{ userData.tel }}</p>
        </v-col>
        <v-col cols="12" md="4">
          <p class="mb-0 subtitle-2 font-weight-bold">อีเมล</p>
          <p class="subtitle-1">{{ userData.email }}</p>
        </v-col>
        <v-col cols="12" md="4">
          <p class="mb-0 subtitle-2 font-weight-bold">ประเภทผู้ใช้</p>
          <p class="subtitle-1">{{ getuserTypeName }}</p>
        </v-col>
        <v-col cols="12" md="4"></v-col>
      </v-row>
      <v-divider class="mt-5"></v-divider>
    </v-card-text>
    <v-card-title class="font-weight-bold"> ข้อมูลการจอง </v-card-title>
    <v-card-subtitle class="subtitle-1 mb-4">
      รายละเอียดวันเวลาการจอง
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">เวลาเริ่ม</p>
          <p class="subtitle-1">{{ displayStartDateTime }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mb-0 subtitle-2 font-weight-bold">เวลาสิ้นสุด</p>
          <p class="subtitle-1">{{ displayEndDateTime }}</p>
        </v-col>
        <v-col cols="12">
          <v-textarea
            class="rounded-xl"
            v-model="bookingData.etc"
            outlined
            disabled
            label="หมายเหตุ"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-divider class="mt-5"></v-divider>
    </v-card-text>
    <div v-if="bookingData.equipments.length != 0">
      <v-card-title class="font-weight-bold"> ข้อมูลอุปกรณ์ </v-card-title>
      <v-card-subtitle class="subtitle-1 mb-4">
        รายการอุปกรณ์ที่เลือก
      </v-card-subtitle>
      <v-card-text>
        <!-- For Desktop -->
        <div v-if="width">
          <v-card
            class="rounded-xl mb-2"
            v-for="item in bookingData.equipments"
            :key="item.id"
          >
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <v-avatar class="ma-3 rounded-xl" size="125">
                  <v-img
                    :src="item.picture"
                    :lazy-src="require('~/static/img/default/no-image.png')"
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-subtitle>{{ item.production_line }}</v-card-subtitle>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between mr-8">
                <v-card-title class="mr-4"
                  >จำนวน :
                  <div class="font-weight-bold ml-2">
                    {{ item.quantity }}
                  </div></v-card-title
                >
              </div>
            </div>
          </v-card>
        </div>
        <!-- For Mobile -->
        <div v-if="!width">
          <v-card
            height="350"
            class="rounded-xl mb-2"
            v-for="item in bookingData.equipments"
            :key="item.id"
          >
            <v-img
              class="rounded-t-xl"
              aspect-ratio="1.3333"
              contain
              :src="item.picture"
              :lazy-src="require('~/static/img/default/no-image.png')"
            ></v-img>
            <v-divider class="my-0" />
            <v-card-title class="mr-4">
              {{ item.name }}
            </v-card-title>
            <v-card-subtitle class="mr-4 d-flex">
              จำนวน :
              <div class="font-weight-bold ml-2">
                {{ item.quantity }}
              </div>
            </v-card-subtitle>
          </v-card>
        </div>
      </v-card-text>
    </div>
  </div>
</template>
  <script>
export default {
  props: {
    bookingData: {
      type: Object,
      default: () => {},
    },
    userData: {
      type: Object,
      default: () => {},
    },
    userTypes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return false
        case 'sm':
          return false
        case 'md':
          return true
        case 'lg':
          return true
        case 'xl':
          return true
      }
    },
    getuserTypeName() {
      let name
      this.userTypes.forEach((type) => {
        if (type.id === this.userData.type_id) {
          return (name = type.name)
        }
      })
      return name
    },
    displayStartDateTime() {
      return this.$moment(this.bookingData.time_start).format(
        'DD/MM/YYYY HH:mm'
      )
    },
    displayEndDateTime() {
      return this.$moment(this.bookingData.time_end).format('DD/MM/YYYY HH:mm')
    },
  },
  methods: {},
}
</script>
<style scoped>
</style>