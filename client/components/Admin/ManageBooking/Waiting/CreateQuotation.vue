<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createQuotation"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :method="refresh"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="700"
      max-height="300"
      content-class="rounded-xl"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-file-document-arrow-right</v-icon
          >
          สร้างใบเสนอราคา
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="ma-1">
            <v-col cols="12">
              <p class="mb-0 subtitle-2 font-weight-bold">รหัสการจอง</p>
              <p class="subtitle-1">{{ bookingData.id }}</p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="mb-0 subtitle-2 font-weight-bold">ชื่อ</p>
              <p class="subtitle-1">{{ bookingData.user.fname }}</p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="mb-0 subtitle-2 font-weight-bold">นามสกุล</p>
              <p class="subtitle-1">{{ bookingData.user.lname }}</p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="mb-0 subtitle-2 font-weight-bold">ประเภท</p>
              <p class="subtitle-1">
                {{ bookingData.user.user_type.name }}
              </p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="mb-0 subtitle-2 font-weight-bold">อีเมล</p>
              <p class="subtitle-1">{{ bookingData.user.email }}</p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="mb-0 subtitle-2 font-weight-bold">เบอร์โทร</p>
              <p class="subtitle-1">{{ bookingData.user.tel }}</p>
            </v-col>
          </v-row>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="ma-1 mt-2">
              <v-col cols="12" md="6">
                <p class="mb-0 subtitle-2 font-weight-bold">ราคาอุปกรณ์</p>
                <p class="subtitle-1">{{ displayEquipmentPrice }}</p>
              </v-col>
              <v-col cols="12" md="6">
                <p class="mb-0 subtitle-2 font-weight-bold">ราคาห้อง</p>
                <p class="subtitle-1">{{ displayRoomPrice }}</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.equipment_price"
                  label="ราคาอุปกรณ์"
                  min="0"
                  step=".01"
                  outlined
                  type="number"
                  class="rounded-xl"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.room_price"
                  label="ราคาห้อง"
                  min="0"
                  step=".01"
                  outlined
                  type="number"
                  class="rounded-xl"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="modal.confirm.open = true"
            :disabled="!valid"
            class="rounded-xl font-weight-medium mt-3"
          >
            สร้าง
          </v-btn>
          <v-btn
            color="error"
            @click="cancel"
            class="rounded-xl font-weight-medium mt-3"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { checkValidPrice, formatToIsoNumber } from '~/utils/general-utils'
export default {
  props: {
    open: {
      required: true,
    },
    bookingData: {
      type: Object,
      default: () => {},
    },
    method: { type: Function, default: null },
  },
  data() {
    return {
      valid: false,
      form: {
        equipment_price: 0.0,
        room_price: 0.0,
      },
      payload: { equipment_price: 0.0, room_price: 0.0 },
      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการสร้างใบเสนอราคา',
        },
        complete: {
          open: false,
          message: '',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: 'กำลังสร้างใบเสนอราคา',
        },
      },
    }
  },
  computed: {
    displayEquipmentPrice() {
      this.payload.equipment_price = formatToIsoNumber(
        this.form.equipment_price
      )
      return formatToIsoNumber(this.form.equipment_price)
    },
    displayRoomPrice() {
      this.payload.room_price = formatToIsoNumber(this.form.room_price)
      return formatToIsoNumber(this.form.room_price)
    },
  },
  methods: {
    async createQuotation() {
      try {
        if (
          !checkValidPrice(this.form.equipment_price) ||
          !checkValidPrice(this.form.room_price)
        ) {
          this.modal.error.message = 'กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน'
          this.modal.error.open = true
          return
        }
        this.modal.loading.open = true
        const response = await this.$store.dispatch(
          'api/admin/createQuotation',
          {
            reserve_id: this.bookingData.id,
            ...this.form,
          }
        )
        if (response.code === 201) {
          this.$emit('update:create', false)
          this.clearForm()
          this.modal.loading.open = false
          this.modal.complete.open = true
          this.modal.complete.message = 'สร้างใบเสนอราคาสำเร็จ'
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
    cancel() {
      this.clearForm()
      this.$emit('update:create', false)
    },
    clearForm() {
      this.form.equipment_price = 0
      this.form.room_price = 0
    },
    refresh() {
      try {
        this.method()
      } catch (error) {
        this.$nuxt.refresh()
      }
    },
  },
}
</script>