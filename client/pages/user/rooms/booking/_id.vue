<template>
  <div>
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <SharedBreadCrumbs title="จองห้อง" :routes="routes" />
    <v-stepper v-model="step" class="rounded-xl">
      <v-stepper-header>
        <v-stepper-step color="black" :complete="step > 1" step="1">
          ขั้นตอนที่ 1 (กรอกข้อมูลการจอง)
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step color="black" :complete="step > 2" step="2">
          ขั้นตอนที่ 2 (ยืนยันข้อมูลการจอง)
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step color="success" :complete="step === 3" step="3">
          จองสำเร็จ
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!-- Step 1 -->
        <v-stepper-content step="1">
          <v-card-title v-if="!loading" class="text-h5 font-weight-bold">
            ห้อง : {{ room.name }}
          </v-card-title>
          <v-skeleton-loader
            v-if="loading"
            type="card-heading"
          ></v-skeleton-loader>
          <v-card class="rounded-xl">
            <v-img
              aspect-ratio="1.7778"
              max-width="1280"
              max-height="720"
              :src="roomPicture"
              :lazy-src="require('~/static/img/default/no-image.png')"
            />
          </v-card>
          <v-card-title class="mt-4 font-weight-bold">
            ข้อมูลส่วนตัว
          </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-4">
            รายละเอียดข้อมูลส่วนตัว
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">ชื่อจริง</p>
                <p class="subtitle-1">{{ userInfo.fname }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">นามสกุล</p>
                <p class="subtitle-1">{{ userInfo.lname }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">เบอร์ติดต่อ</p>
                <p class="subtitle-1">{{ userInfo.tel }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">อีเมล</p>
                <p class="subtitle-1">{{ userInfo.email }}</p>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="6">
                  <p class="mb-2 subtitle-2 font-weight-bold">วันที่จอง</p>
                  <div>
                    <v-menu
                      max-width="290"
                      min-width="290"
                      v-model="dateTimePicker.datePicker"
                      :close-on-content-click="false"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateTimePicker.selectedDate"
                          prepend-icon="mdi-calendar"
                          readonly
                          outlined
                          class="rounded-xl"
                          v-on="on"
                          :rules="[(v) => !!v || 'โปรดระบุวันที่จอง']"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="th"
                        v-model="dateTimePicker.selectedDate"
                        @input="dateTimePicker.datePicker = false"
                        :min="tomorrow"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
                <v-col cols="12" md="6"></v-col>
                <v-col cols="12" md="6">
                  <p class="mb-2 subtitle-2 font-weight-bold">เวลาเริ่ม</p>
                  <div>
                    <v-menu
                      max-width="290"
                      min-width="290"
                      v-model="dateTimePicker.timePicker1"
                      :close-on-content-click="false"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateTimePicker.timeStart"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          outlined
                          class="rounded-xl"
                          v-on="on"
                          :rules="[(v) => !!v || 'โปรดระบุเวลาเริ่ม']"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="dateTimePicker.timeStart"
                        @input="dateTimePicker.timePicker1 = false"
                        format="24hr"
                        min="07:00"
                        max="16:00"
                      ></v-time-picker>
                    </v-menu>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="mb-2 subtitle-2 font-weight-bold">เวลาสิ้นสุด</p>
                  <div>
                    <v-menu
                      max-width="290"
                      min-width="290"
                      v-model="dateTimePicker.timePicker2"
                      :close-on-content-click="false"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateTimePicker.timeEnd"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          outlined
                          class="rounded-xl"
                          v-on="on"
                          :rules="[(v) => !!v || 'โปรดระบุเวลาสิ้นสุด']"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="dateTimePicker.timeEnd"
                        @input="dateTimePicker.timePicker2 = false"
                        format="24hr"
                        min="07:00"
                        max="16:00"
                      ></v-time-picker>
                    </v-menu>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="rounded-xl"
                    v-model="form.etc"
                    outlined
                    label="หมายเหตุ"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
            <v-divider class="mt-5"></v-divider>
          </v-card-text>
          <v-card-title class="font-weight-bold">
            เพิ่มอุปกรณ์ (ไม่จำเป็น)</v-card-title
          >
          <v-card-subtitle class="subtitle-1 mb-4">
            เลือกอุปกรณ์เพิ่มเติม
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn dark large class="rounded-xl subtitle-1 font-weight-bold"
                  >เพิ่มอุปกรณ์
                  <v-icon class="ml-1">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="rounded-xl"
              color="primary"
              :disabled="!valid"
              @click="confirmBookingData"
            >
              ต่อไป
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <!-- Step 2 -->
        <v-stepper-content step="2">
          <v-card-title class="font-weight-bold"> ยืนยันข้อมูล </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-4">
            โปรดเช็ครายละเอียดก่อนกดส่งข้อมูลการจอง
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">ชื่อจริง</p>
                <p class="subtitle-1">{{ userInfo.fname }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">นามสกุล</p>
                <p class="subtitle-1">{{ userInfo.lname }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">เบอร์ติดต่อ</p>
                <p class="subtitle-1">{{ userInfo.tel }}</p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="mb-0 subtitle-2 font-weight-bold">อีเมล</p>
                <p class="subtitle-1">{{ userInfo.email }}</p>
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
                  v-model="form.etc"
                  outlined
                  disabled
                  label="หมายเหตุ"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl mx-5" color="primary" @click="step = 1">
              ถอยกลับ
            </v-btn>
            <v-btn
              class="rounded-xl mx-5"
              color="primary"
              :disabled="!valid"
              @click="submit"
            >
              ส่งข้อมูลการจอง
            </v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card height="400" class="text-center" elevation="0">
            <div class="mt-10 center-complete-card">
              <h1>
                <v-icon class="mr-2" color="black" x-large
                  >mdi-calendar-check</v-icon
                >จองสำเร็จ !
              </h1>
              <p>สามารถตรวจสอบสถานะการจองได้ที่หน้ารายการจองทั้งหมด</p>
              <v-btn @click="$router.push('user/home')" class="rounded-xl text-h6" dark>ตกลง</v-btn>
            </div>
          </v-card>
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
    const room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    const user = await this.$store.dispatch('api/user/getUserInfo', {
      params: { id: this.id },
    })
    const equipments = await this.$store.dispatch(
      'api/user/getAllEquipmentInfoInRoom',
      {
        params: { id: this.id },
      }
    )
    const userTypes = await this.$store.dispatch(
      'api/public/getAllUserTypesDropdown'
    )
    if ((!room, !user)) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room or User Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room[0]
      this.roomPicture = room.room[0].picture[0].url
      this.routes[2].name = room.room[0].name
      this.loading = false
      this.userInfo = user.user
      this.equipments = equipments.equipments
      this.userTypes = userTypes.user_types
    }
  },
  head() {
    return {
      title: 'จองห้องแลป',
    }
  },
  data() {
    return {
      dateTimePicker: {
        datePicker: false,
        selectedDate: null,
        timePicker1: false,
        timePicker2: false,
        timeStart: '',
        timeEnd: '',
      },
      form: {
        time_start: null,
        time_end: null,
        etc: '',
      },
      valid: false,
      step: 1,
      equipments: [],
      userTypes: [],
      room: {},
      roomPicture: '',
      userInfo: [],
      modal: {
        confirm: {
          open: false,
          message: 'confirm register?',
        },
        complete: {
          open: false,
          message: 'Register complete press ok to login',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: 'registering',
        },
      },
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ห้องแลป', to: '/user/rooms' },
        { id: 3, name: '', to: `/user/rooms/${this.$route.params.id}` },
        { id: 4, name: 'จอง', to: '/' },
      ],
      loading: true,
    }
  },
  computed: {
    getuserTypeName() {
      let name
      this.userTypes.forEach((type) => {
        if (type.id === this.userInfo.type_id) {
          return (name = type.name)
        }
      })
      return name
    },
    tomorrow() {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().substr(0, 10)
    },
    displayStartDateTime() {
      return this.$moment(this.form.time_start).format('DD/MM/YYYY HH:mm')
    },
    displayEndDateTime() {
      return this.$moment(this.form.time_end).format('DD/MM/YYYY HH:mm')
    },
  },
  methods: {
    combineDateTime() {
      const timeStart = new Date(
        `${this.dateTimePicker.selectedDate}T${this.dateTimePicker.timeStart}`
      )
      const timeEnd = new Date(
        `${this.dateTimePicker.selectedDate}T${this.dateTimePicker.timeEnd}`
      )
      this.form.time_start = timeStart.toISOString()
      this.form.time_end = timeEnd.toISOString()
    },
    confirmBookingData() {
      try {
        if (!this.$refs.form.validate()) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.combineDateTime()
        // check start time < end time
        if (
          !this.$moment(this.form.time_start).isBefore(
            this.$moment(this.form.time_end)
          )
        ) {
          this.modal.error.message = 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม'
          this.modal.error.open = true
          return
        }
        this.step = 2
      } catch (error) {
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    async submit() {
      try {
        const response = await this.$store.dispatch('api/user/createReserve', {
          room_id: this.id,
          time_start: this.form.time_start,
          time_end: this.form.time_end,
          details: this.form.etc,
        })
        if (response.code === 201) {
          console.log('complete')
          this.step = 3
        }
      } catch (error) {
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
  },
}
</script>
<style scoped>
.center-complete-card {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
