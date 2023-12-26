<template>
  <div class="ma-4">
    <SharedBreadCrumbs title="จองห้อง" :routes="routes" />
    <v-stepper v-model="step" class="rounded-xl">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          ขั้นตอนที่ 1
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2"> ขั้นตอนที่ 2 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
            {{ room.name }}
          </v-card-title>
          <v-skeleton-loader
            v-if="loading"
            type="card-heading"
          ></v-skeleton-loader>
          <v-row justify="center" align="center">
            <v-col cols="12" md="6">
              <v-img
                contain
                aspect-ratio="1.3333"
                width="640"
                height="480"
                :src="picture"
                :lazy-src="require('~/static/img/default/no-image.png')"
                class="rounded-xl"
              />
            </v-col>
          </v-row>
          <v-skeleton-loader v-if="loading" type="article"></v-skeleton-loader>

          <v-card-title> ข้อมูลส่วนตัว </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-4">
            รายละเอียดข้อมูลส่วนตัว
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.fname"
                  outlined
                  disabled
                  label="ชื่อจริง"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.lname"
                  outlined
                  disabled
                  label="นามสกุล"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.tel"
                  outlined
                  disabled
                  label="เบอร์ติดต่อ"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.email"
                  outlined
                  disabled
                  label="อีเมล"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.type_id"
                  outlined
                  disabled
                  label="ประเภทผู้ใช้"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  class="rounded-xl"
                  v-model="etc"
                  outlined
                  label="หมายเหตุ"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
          </v-card-text>

          <v-row>
            <v-col cols="12">
              <p class="subtitle-1">วันที่จอง</p>
              <v-text-field
                class="rounded-xl"
                v-model="date_start"
                outlined
                dense
                hide-details
                disabled
              >
                <template v-slot:append-outer>
                  <UserCartDatePicker v-model="date_start" />
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <p class="subtitle-1">เวลาเริ่มจอง</p>
              <v-text-field
                class="rounded-xl"
                v-model="time_start"
                outlined
                dense
                hide-details
                disabled
              >
                <template v-slot:append-outer>
                  <UserCartTimePicker v-model="time_start" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <p class="subtitle-1">เวลาที่สิ้นสุดการจอง</p>
              <v-text-field
                class="rounded-xl"
                v-model="time_end"
                outlined
                dense
                hide-details
                disabled
              >
                <template v-slot:append-outer>
                  <UserCartTimePicker v-model="time_end" />
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl" color="primary" @click="step = 2">
              ต่อไป
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card-title> ยืนยันข้อมูล </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-4">
            โปรดเช็ครายละเอียดก่อนกดชำระเงิน
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.fname"
                  outlined
                  disabled
                  label="ชื่อจริง"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.lname"
                  outlined
                  disabled
                  label="นามสกุล"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.tel"
                  outlined
                  disabled
                  label="เบอร์ติดต่อ"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.email"
                  outlined
                  disabled
                  label="อีเมล"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  class="rounded-xl"
                  v-model="UserInfo.type_id"
                  outlined
                  disabled
                  label="ประเภทผู้ใช้"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mt-5 mb-5"></v-divider>
            <h1>ราคาการจองห้อง {{ room.rent_price }} บาท</h1>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-col cols="12">
              <v-textarea
                class="rounded-xl"
                v-model="etc"
                outlined
                disabled
                label="หมายเหตุ"
              ></v-textarea>
            </v-col>
          </v-card-text>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl mx-5" color="primary" @click="step = 1">
              ถอยกลับ
            </v-btn>
            <v-btn class="rounded-xl mx-5" color="primary"> ชำระเงิน </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    let Data = await this.$store.dispatch('api/user/getUserInfo', {
      params: { id: this.id },
    })
    let Equips = await this.$store.dispatch(
      'api/user/getAllEquipmentInfoInRoom',
      {
        params: { id: this.id },
      }
    )
    if ((!room, !Data)) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room or User Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room[0]
      this.routes[2].name = room.room[0].name
      this.loading = false
      this.UserInfo = Data.user
      this.Equipments = Equips.data
    }
  },
  computed: {
    picture() {
      try {
        if (!this.room.picture[0]) {
          return require('~/static/img/default/no-image.png')
        } else {
          return this.room.picture[0].url
        }
      } catch (error) {
        return require('~/static/img/default/no-image.png')
      }
    },
  },
  head() {
    return {
      title: 'ตะกร้า',
    }
  },
  data() {
    return {
      step: 1,
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      Equipments: [],
      foo: 0,
      etc: '',
      room: {},
      UserInfo: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ห้องแลป', to: '/user/rooms' },
        { id: 3, name: '', to: `/user/rooms/${this.$route.params.id}` },
        { id: 4, name: 'จอง', to: '/' },
      ],
      loading: true,
      modal: {
        goToLogin: {
          open: false,
          message: 'กรุณาเข้าสู่ระบบเพื่อใช้งานบริการทั้งหมด',
        },
      },
    }
  },
  methods: {
    increment() {
      this.foo = parseInt(this.foo, 10) + 1
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1
    },
  },
}
</script>

<style scoped></style>
