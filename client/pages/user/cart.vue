<template>
  <div class="ma-4">
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <SharedBreadCrumbs title="ตะกร้า" :routes="routes" />
    <v-stepper v-model="step" class="rounded-xl">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          ขั้นตอนที่ 1(กรอกข้อมูลการจอง)
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          ขั้นตอนที่ 2(เพิ่มหรือลบเครื่องมือ)
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 3" step="3">
          ขั้นตอนที่ 3(ยืนยันข้อมูลการจอง)
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="4">
          ขั้นตอนที่ 4(ส่งข้อมูลการจองสำเร็จ)
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
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
                <p class="subtitle-1">{{ getUserTypeName }}</p>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="rounded-xl white--text"
              elevation="0"
              color="black"
              :disabled="!valid"
              @click="confirmBookingData"
            >
              ต่อไป
            </v-btn>
          </v-card-actions>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <v-card-title class="mt-4 font-weight-bold">
              รายการสินค้า
            </v-card-title>
            <v-card-subtitle class="subtitle-1 mb-4">
              สามารถเพิ่มจำนวนหรือลบสินค้าออกจากตระกร้า
            </v-card-subtitle>
            <v-row v-if="form.equipments.length === 0" class="mt-4">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  dark
                  large
                  class="rounded-xl subtitle-1 font-weight-bold"
                  @click="$router.push('/user/equipments')"
                  >เพิ่มอุปกรณ์
                  <v-icon class="ml-1">mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <!-- For Desktop -->
            <div class="mx-2" v-if="width">
              <v-card
                class="rounded-xl mb-2"
                v-for="item in form.equipments"
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
                      <v-card-subtitle>{{ item.production_line.name }}</v-card-subtitle>
                    </div>
                  </div>
                  <div class="d-flex align-center justify-space-between mr-8">
                    <v-card-title class="mr-4"
                      >จำนวน :
                      <div class="d-flex">
                        <v-btn
                          fab
                          color="black"
                          class="white--text my-0 mx-4"
                          :disabled="minusDisable(item.quantity)"
                          @click="decreaseQuantity(item.id)"
                        >
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <div class="text-h6 font-weight-bold mx-6 my-3">
                          {{ item.quantity }}
                        </div>
                        <v-btn
                          fab
                          color="black"
                          class="white--text my-0 mx-4"
                          :disable="plusDisable(item.id)"
                          @click="increaseQuantity(item.id)"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div></v-card-title
                    >
                    <v-btn
                      icon
                      text
                      color="error"
                      @click="removeEquipment(item.id)"
                    >
                      <v-icon class="pa-2" large>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </div>
            <!-- For Mobile -->
            <div v-if="!width">
              <v-card
                height="380"
                class="rounded-xl mb-2"
                v-for="item in form.equipments"
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
                  <div class="d-flex">
                    <v-btn
                      x-small
                      fab
                      color="black"
                      class="white--text my-0 mx-4"
                      :disabled="minusDisable(item.quantity)"
                      @click="decreaseQuantity(item.id)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <div class="text-h6 font-weight-bold mx-6">
                      {{ item.quantity }}
                    </div>
                    <v-btn
                      x-small
                      fab
                      color="black"
                      class="white--text my-0 mx-4"
                      :disable="plusDisable(item.id)"
                      @click="increaseQuantity(item.id)"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-card-subtitle>
                <v-card-actions class="d-flex justify-center">
                  <v-btn
                    elevation="0"
                    color="error"
                    class="rounded-xl"
                    width="100"
                    @click="removeEquipment(item.id)"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                    ลบ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
          <v-divider class="mt-4 mb-10"></v-divider>
          <v-card-actions>
            <v-btn class="rounded-xl" elevation="0" @click="step = 1">
              ถอยกลับ
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="rounded-xl white--text"
              elevation="0"
              color="black"
              :disabled="!valid"
              @click="step = 3"
            >
              ถัดไป
            </v-btn>
          </v-card-actions>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card-title class="mt-4 font-weight-bold">
            ยืนยันข้อมูล
          </v-card-title>
          <v-card-subtitle class="subtitle-1 mb-4">
            โปรดเช็ครายละเอียดก่อนกดดำเนินการ
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
                <p class="subtitle-1">{{ getUserTypeName }}</p>
              </v-col>
              <v-col cols="12" md="4"></v-col>
            </v-row>
            <v-col cols="12">
              <p class="mb-2 subtitle-2 font-weight-bold">หมายเหตุ</p>
              <v-textarea
                class="rounded-xl"
                v-model="form.etc"
                outlined
                disabled
                label="หมายเหตุ"
              ></v-textarea>
            </v-col>
            <v-divider class="mt-5"></v-divider>
            <div>
              <v-card-title class="font-weight-bold"> อุปกรณ์ </v-card-title>
              <v-card-subtitle class="subtitle-1 mb-4">
                รายละเอียดอุปกรณ์ที่จอง
              </v-card-subtitle>
              <!-- For Desktop -->
              <div v-if="width" class="ma-2">
                <v-card
                  class="rounded-xl mb-2"
                  v-for="item in form.equipments"
                  :key="item.id"
                >
                  <div class="d-flex justify-space-between">
                    <div class="d-flex">
                      <v-avatar class="ma-3 rounded-xl" size="125">
                        <v-img
                          :src="item.picture"
                          :lazy-src="
                            require('~/static/img/default/no-image.png')
                          "
                        ></v-img>
                      </v-avatar>
                      <div>
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle>
                          {{ item.production_line.name }}
                        </v-card-subtitle>
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
              <div v-if="!width" class="ma-1">
                <v-card
                  height="350"
                  class="rounded-xl mb-2"
                  v-for="item in form.equipments"
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
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="rounded-xl" elevation="0" @click="step = 2">
              ถอยกลับ
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="rounded-xl white--text"
              elevation="0"
              color="black"
              :disabled="!valid"
              @click="submit"
            >
              ส่งข้อมูลการจอง
            </v-btn>
          </v-card-actions>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card height="400" class="text-center" elevation="0">
            <div class="mt-10 center-complete-card">
              <h1>
                <v-icon class="mr-2" color="black" x-large
                  >mdi-calendar-check</v-icon
                >ส่งข้อมูลการจองสำเร็จ !
              </h1>
              <p>สามารถตรวจสอบสถานะการจองได้ที่หน้ารายการจองทั้งหมด</p>
              <v-btn
                @click="$router.push('/user/home')"
                class="rounded-xl text-h6"
                dark
                >ตกลง
              </v-btn>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { removeObjectWithId } from '~/utils/general-utils'
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'ตะกร้า',
    }
  },
  async fetch() {
    let Data = await this.$store.dispatch('api/user/getUserInfo', {
      params: { id: this.id },
    })
    const userTypes = await this.$store.dispatch(
      'api/public/getAllUserTypesDropdown'
    )
    if (!Data) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Data Not found ' + this.id,
      })
      return
    } else {
      this.userInfo = Data.user
      this.userTypes = userTypes.user_types
      this.refreshCartData()
    }
  },
  data() {
    return {
      userTypes: [],
      step: 1,
      userInfo: {},
      date_start: null,
      date_end: null,
      time_start: null,
      time_end: null,
      valid: false,
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
        equipments: [],
      },
      cartItems: [],
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ตะกร้า', to: '/user/cart' },
      ],
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
    }
  },
  watch: {
    'newEquipment.equipment': function () {
      this.newEquipment.quantity = 1
    },
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
    getUserTypeName() {
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
    async refreshCartData() {
      const cartStoreItem = await this.$store.getters.getCartItems
      this.cartItems = []
      this.form.equipments = []
      cartStoreItem.forEach((item) => {
        let newItem = { ...item.equipment }
        this.cartItems.push(newItem)
      })
      this.cartItems.forEach((item) => {
        let newItem = { ...item }
        newItem.quantity = 1
        this.form.equipments.push(newItem)
      })
    },
    increaseQuantity(id) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === id) {
          for (let j = 0; j < this.form.equipments.length; j++) {
            if (this.form.equipments[j].id === id) {
              if (
                this.form.equipments[j].quantity <=
                this.cartItems[i].quantity - 1
              ) {
                return (this.form.equipments[j].quantity += 1)
              } else {
                return
              }
            }
          }
        }
      }
    },
    decreaseQuantity(id) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === id) {
          for (let j = 0; j < this.form.equipments.length; j++) {
            if (this.form.equipments[j].id === id) {
              if (this.form.equipments[j].quantity <= 1) {
                return
              } else {
                return (this.form.equipments[j].quantity -= 1)
              }
            }
          }
        }
      }
    },
    plusDisable(id) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === id) {
          for (let j = 0; j < this.form.equipments.length; j++) {
            if (this.form.equipments[j].id === id) {
              console.log('1---', this.form.equipments[j].id)
              console.log('1---', this.form.equipments[j].quantity)
              console.log('2---', this.cartItems[i].quantity)
              if (
                this.form.equipments[j].quantity < this.cartItems[i].quantity
              ) {
                return false
              } else {
                console.log('true')
                return true
              }
            }
          }
        }
      }
    },
    minusDisable(quantity) {
      if (quantity <= 1) {
        return true
      } else {
        return false
      }
    },
    addEquipment() {
      if (typeof this.newEquipment.equipment !== 'string') {
        return
      }
      for (let i = 0; i < this.equipments.length; i++) {
        if (this.equipments[i].id === this.newEquipment.equipment) {
          this.form.equipments.push({
            id: this.equipments[i].id,
            name: this.equipments[i].name,
            details: this.equipments[i].details,
            rent_price: this.equipments[i].rent_price,
            picture: this.equipments[i].picture,
            quantity: this.newEquipment.quantity,
          })
        }
      }
      this.closeNewEquipmentcard()
    },
    async removeEquipment(id) {
      console.log(id)
      await this.$store.dispatch('removeCartItem', id)
      const newCartItems = removeObjectWithId(this.cartItems, id)
      this.cartItems = newCartItems
      const newEquipments = removeObjectWithId(this.form.equipments, id)
      this.form.equipments = newEquipments
      // this.refreshCartData()
    },
    async submit() {
      try {
        const response = await this.$store.dispatch('api/user/createReserve', {
          room_id: null,
          time_start: this.form.time_start,
          time_end: this.form.time_end,
          details: this.form.etc,
          equipment: this.form.equipments,
        })
        if (response.code === 201) {
          this.step = 4
        }
      } catch (error) {
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
  },
}
</script>
