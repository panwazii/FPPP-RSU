<template>
  <div>
    <AdminQuotationDialog
      :bookingData="bookingData"
      :open="quotationDialog"
      :close.sync="quotationDialog"
      v-if="!loading"
    />
    <AdminReceiptDialog
      :bookingData="bookingData"
      :open="receiptDialog"
      :close.sync="receiptDialog"
      v-if="!loading"
    />
    <!-- Cancel -->
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="cancelBooking"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :method="goToManageBooking"
      :complete.sync="modal.complete.open"
    />
    <!-- Confirm -->
    <ModalConfirm
      :open="modal.confirmTransaction.open"
      :message="modal.confirmTransaction.message"
      :method="confirmTransaction"
      :confirm.sync="modal.confirmTransaction.open"
    />
    <ModalComplete
      :open="modal.completeTransaction.open"
      :message="modal.completeTransaction.message"
      :method="goToManageBooking"
      :complete.sync="modal.completeTransaction.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <SharedBreadCrumbs title="รายละเอียดการจอง" :routes="routes" />
    <v-card min-height="200" v-if="loading" class="rounded-xl mt-2 pa-4">
      <v-skeleton-loader type="article"></v-skeleton-loader>
    </v-card>
    <v-card min-height="800" v-if="!loading" class="rounded-xl mt-2 pa-4">
      <div>
        <div class="d-flex justify-space-between">
          <div>
            <v-card-title class="font-weight-bold">
              <div class="d-flex">ข้อมูลผู้จอง</div>
            </v-card-title>
            <v-card-subtitle class="subtitle-1 mb-4">
              รายละเอียดข้อมูลผู้จอง
            </v-card-subtitle>
          </div>
          <div>
            <div>
              <v-btn
                color="error"
                class="rounded-xl"
                elevation="0"
                @click="modal.confirm.open = true"
              >
                <v-icon class="mr-1">mdi-close-circle</v-icon>
                ยกเลิกการจอง
              </v-btn>
              <v-btn
                elevation="0"
                color="success"
                class="rounded-xl"
                @click="modal.confirmTransaction.open = true"
              >
                <v-icon class="mr-1">mdi-check-circle</v-icon>
                ยืนยันการชำระเงิน
              </v-btn>
              <v-btn
                color="primary"
                elevation="0"
                class="rounded-xl"
                @click="quotationDialog = true"
              >
                <v-icon class="mr-1">mdi-text-box-search</v-icon>
                ดูใบเสนอราคา
              </v-btn>
              <v-btn
                dark
                class="rounded-xl"
                elevation="0"
                @click="$router.push('/admin/manage-booking')"
              >
                <v-icon class="mr-1">mdi-arrow-left-bold-circle</v-icon>
                กลับ
              </v-btn>
            </div>
            <div class="mt-2 d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                elevation="0"
                class="rounded-xl"
                @click="receiptDialog = true"
              >
                <v-icon class="mr-1">mdi-receipt-text</v-icon>
                ดูใบเสร็จ
              </v-btn>
            </div>
          </div>
        </div>
        <v-row class="ma-1">
          <v-col cols="12">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">id</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.id }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">ชื่อ</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.fname }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">นามสกุล</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.lname }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">ประเภท</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.user_type.name }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">อีเมล</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.email }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">เบอร์โทร</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.tel }}</p>
          </v-col>
          <v-col cols="12">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">ที่อยู่</p>
            <p class="ml-4 subtitle-1">{{ bookingData.user.address }}</p>
          </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <v-card-title class="font-weight-bold">
          <div class="d-flex">รายละเอียดการจอง</div>
        </v-card-title>
        <v-card-subtitle class="subtitle-1 mb-4">
          รายละเอียดวันและเวลาการจอง
        </v-card-subtitle>
        <v-row class="ma-1">
          <v-col cols="12">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">id</p>
            <p class="ml-4 subtitle-1">{{ bookingData.id }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="ml-4 mb-1 subtitle-2 font-weight-bold">สถานะการจอง</p>
            <p class="ml-2 subtitle-1">
              <v-chip :input-value="true">{{ displayBookingStatus }}</v-chip>
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="ml-4 mb-1 subtitle-2 font-weight-bold">ประเภทการจอง</p>
            <p class="ml-2 subtitle-1">
              <v-chip :input-value="true">
                {{ displayBookingType }}
              </v-chip>
            </p>
          </v-col>
          <v-col cols="12">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">วันที่จอง</p>
            <p class="ml-4 subtitle-1">{{ displayStartDate }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">เวลาเริ่ม</p>
            <p class="ml-4 subtitle-1">{{ displayStartTime }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">เวลาสิ้นสุด</p>
            <p class="ml-4 subtitle-1">{{ displayEndTime }}</p>
          </v-col>
          <v-col cols="12">
            <p class="ml-4 mb-0 subtitle-2 font-weight-bold">หมายเหตุ</p>
            <p class="ml-4 subtitle-1">{{ bookingData.details }}</p>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mt-5"></v-divider>
      <div v-if="bookingData.room_id !== null">
        <v-card-title class="font-weight-bold"> ห้อง </v-card-title>
        <v-card-subtitle class="subtitle-1 mb-4">
          รายละเอียดห้องที่จอง
        </v-card-subtitle>
        <!-- For Desktop -->
        <div v-if="width" class="ma-2">
          <v-card class="rounded-xl mb-2">
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <v-avatar class="ma-3 rounded-xl" size="125">
                  <v-img
                    :src="roomPicture"
                    :lazy-src="require('~/static/img/default/no-image.png')"
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title>{{ bookingData.room.name }}</v-card-title>
                  <v-card-subtitle>
                    <div class="line-clamp">
                      {{ bookingData.room.details }}
                    </div>
                  </v-card-subtitle>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <!-- For Mobile -->
        <div v-if="!width" class="ma-1">
          <v-card height="350" class="rounded-xl mb-2">
            <v-img
              class="rounded-t-xl"
              aspect-ratio="1.3333"
              contain
              :src="roomPicture"
              :lazy-src="require('~/static/img/default/no-image.png')"
            ></v-img>
            <v-divider class="my-0" />
            <v-card-title class="mr-4">
              {{ bookingData.room.name }}
            </v-card-title>
            <v-card-subtitle class="mr-4 d-flex">
              <div class="line-clamp">
                {{ bookingData.room.details }}
              </div>
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
      <v-divider class="mt-5"></v-divider>
      <div v-if="bookingData.reserve_equipment.length > 0">
        <v-card-title class="font-weight-bold"> อุปกรณ์ </v-card-title>
        <v-card-subtitle class="subtitle-1 mb-4">
          รายละเอียดอุปกรณ์ที่จอง
        </v-card-subtitle>
        <!-- For Desktop -->
        <div v-if="width" class="ma-2">
          <v-card
            class="rounded-xl mb-2"
            v-for="item in bookingData.reserve_equipment"
            :key="item.id"
          >
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <v-avatar class="ma-3 rounded-xl" size="125">
                  <v-img
                    :src="item.equipment_info.picture"
                    :lazy-src="require('~/static/img/default/no-image.png')"
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title>{{ item.equipment_info.name }}</v-card-title>
                  <v-card-subtitle>
                    {{ item.equipment_info.production_line.name }}
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
            v-for="item in bookingData.reserve_equipment"
            :key="item.id"
          >
            <v-img
              class="rounded-t-xl"
              aspect-ratio="1.3333"
              contain
              :src="item.equipment_info.picture"
              :lazy-src="require('~/static/img/default/no-image.png')"
            ></v-img>
            <v-divider class="my-0" />
            <v-card-title class="mr-4">
              {{ item.equipment_info.production_line.name }}
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
    </v-card>
  </div>
</template>
      <script>
export default {
  layout: 'admin',
  middleware: 'admin',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let booking = await this.$store.dispatch('api/admin/getSingleReserve', {
      params: { id: this.id },
    })
    if (!booking.data) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' error' + this.id,
      })
      return
    } else {
      this.bookingData = booking.data
      this.setRoomPicture()
      this.routes[1].name = this.bookingData.id
      this.loading = false
    }
  },
  data() {
    return {
      bookingData: {},
      roomPicture: '',
      tool: [],
      quotationDialog: false,
      receiptDialog: false,
      loading: true,
      routes: [
        { id: 1, name: 'รายการจอง', to: '/admin/manage-booking' },
        {
          id: 2,
          name: '',
          to: '/',
        },
      ],
      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการยกเลิกการจอง',
        },
        complete: {
          open: false,
          message: '',
        },
        confirmTransaction: {
          open: false,
          message: 'ยืนยันการชำระเงิน',
        },
        completeTransaction: {
          open: false,
          message: '',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: '',
        },
      },
    }
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
    displayBookingStatus() {
      try {
        if (this.bookingData.approval_status === 'WAITING') {
          return 'รอการตรวจสอบ'
        } else if (this.bookingData.approval_status === 'RETURN_QUOTATION') {
          return 'ได้รับใบเสนอราคา'
        } else if (this.bookingData.approval_status === 'CONFIRM_QUOTATION') {
          return 'รอการชำระเงิน'
        } else if (this.bookingData.approval_status === 'CONFIRM') {
          return 'การจองสำเร็จ'
        } else if (this.bookingData.approval_status === 'CANCEL') {
          return 'การจองถูกยกเลิก'
        } else {
          return 'n/a'
        }
      } catch (error) {
        return 'n/a'
      }
    },
    displayBookingType() {
      try {
        if (
          this.bookingData.room_id &&
          this.bookingData.reserve_equipment.length > 0
        ) {
          return 'จ้องห้องพร้อมอุปกรณ์'
        } else if (this.bookingData.room_id) {
          return 'จ้องห้อง'
        } else if (this.bookingData.reserve_equipment.length > 0) {
          return 'จ้องอุปกรณ์'
        } else {
          return 'n/a'
        }
      } catch (error) {
        return 'n/a'
      }
    },
    displayStartDate() {
      try {
        return this.$moment(this.bookingData.time_start).format('DD/MM/YYYY')
      } catch (error) {
        return 'n/a'
      }
    },
    displayStartTime() {
      try {
        return this.$moment(this.bookingData.time_start).format('HH:mm')
      } catch (error) {
        return 'n/a'
      }
    },
    displayEndTime() {
      try {
        return this.$moment(this.bookingData.time_end).format('HH:mm')
      } catch (error) {
        return 'n/a'
      }
    },
  },

  methods: {
    setRoomPicture() {
      try {
        if (this.bookingData.room.picture.length > 0) {
          this.roomPicture = this.bookingData.room.picture[0].url
        }
      } catch (error) {
        this.roomPicture = require('~/static/img/default/no-image.png')
      }
    },
    goToManageBooking() {
      this.$router.push('/admin/manage-booking')
    },
    async cancelBooking() {
      try {
        const response = await this.$store.dispatch('api/admin/cancelReserve', {
          id: this.bookingData.id,
        })
        if (response.code === 200) {
          this.modal.loading.open = false
          this.modal.complete.open = true
          this.modal.complete.message = 'ยกเลิกการจอง'
        } else {
          this.modal.loading.open = false
          this.modal.error.message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก'
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    async confirmTransaction() {
      try {
        const response = await this.$store.dispatch(
          'api/admin/confirmReserve',
          {
            id: this.bookingData.id,
          }
        )
        if (response.code === 200) {
          this.modal.loading.open = false
          this.modal.completeTransaction.open = true
          this.modal.completeTransaction.message = 'ยืนยันการชำระเงินสำเร็จ'
        } else {
          this.modal.loading.open = false
          this.modal.error.message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก'
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
  },
}
</script>
      <style scoped>
.line-clamp {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>