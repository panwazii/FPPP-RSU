<template>
  <div>
    <!-- <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="confirmPrice"
      :confirm.sync="modal.confirm.open"
    /> -->
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
    <v-card class="rounded-xl mt-4">
      <v-card-title class="ml-2">
        วันที่ {{ displayStartDate }} เวลา {{ displayStartTime }} -
        {{ displayEndTime }}
      </v-card-title>
      <v-card-subtitle class="subtitle-1 font-weight-bold">
        <div>
          <v-chip color="secondary" :input-value="true">
            {{ displayBookingType }}</v-chip
          >
          <v-chip
            color="primary"
            :input-value="true"
            v-if="bookingData.room_id"
          >
            ห้อง : {{ bookingData.room.name }}</v-chip
          >
          <v-chip :input-value="true" v-if="displayEquipmentCount !== 0">
            อุปกรณ์ทั้งหมด : {{ displayEquipmentCount }}</v-chip
          >
        </div>
        <div class="mt-2">
          <v-chip
            color="success"
            :input-value="true"
            v-if="bookingData.receipt !== null"
          >
            <v-icon class="mr-1">mdi-receipt-text-check</v-icon>
            อัพโหลดใบเสร็จแล้ว</v-chip
          >
          <v-chip :input-value="true" v-if="bookingData.receipt === null">
            <v-icon class="mr-1">mdi-receipt-text-remove</v-icon>
            ยังไม่ได้อัพโหลดใบเสร็จ</v-chip
          >
        </div>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer />
        <v-btn
          elevation="0"
          class="rounded-xl mr-2"
          color="primary"
          @click="$refs.fileInput.click()"
        >
          <v-icon>mdi-receipt-text-plus</v-icon>
          อัพโหลดใบเสร็จ
        </v-btn>
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="uploadReceipt"
        />
        <v-btn
          dark
          elevation="0"
          class="rounded-xl"
          @click="
            $router.push(`/user/booking/confirm-quotation/${bookingData.id}`)
          "
          >ดูรายละเอียด
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
      <script>
export default {
  props: {
    bookingData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      modal: {
        confirm: {
          open: false,
          message: 'อัพโหลดใบเสร็จ',
        },
        complete: {
          open: false,
          message:
            'อัพโหลดใบเสร็จสำเร็จ สามารถดูใบเสร็จที่อัพโหลดได้ในหน้ารายละเอียด',
        },
        error: {
          open: false,
          message: '',
        },
        loading: {
          open: false,
          message: 'กำลังอัพโหลดใบเสร็จ',
        },
      },
    }
  },
  methods: {
    async uploadReceipt(event) {
      try {
        this.modal.loading.open = true
        const selectedFile = event.target.files[0]
        let file = new FormData()
        file.append('id', this.bookingData.id)
        file.append('file', selectedFile)
        const response = await this.$store.dispatch(
          'api/user/uploadReceipt',
          file
        )
        if (response.code === 201) {
          this.modal.loading.open = false
          this.modal.complete.open = true
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
  computed: {
    displayEquipmentCount() {
      try {
        if (this.bookingData.reserve_equipment.length > 0) {
          let count = 0
          this.bookingData.reserve_equipment.forEach((item) => {
            count += item.quantity
          })
          return count
        } else {
          return 0
        }
      } catch (error) {
        return 0
      }
    },
    displayBookingType() {
      try {
        if (
          this.bookingData.room_id &&
          this.bookingData.reserve_equipment.length > 0
        ) {
          return 'จองห้องพร้อมอุปกรณ์'
        } else if (this.bookingData.room_id) {
          return 'จองห้อง'
        } else if (this.bookingData.reserve_equipment.length > 0) {
          return 'จองอุปกรณ์'
        } else {
          return 'n/a'
        }
      } catch (error) {
        return 'n/a'
      }
    },
    displayStartDate() {
      return this.$moment(this.bookingData.time_start).format('DD/MM/YYYY')
    },
    displayStartTime() {
      return this.$moment(this.bookingData.time_start).format('HH:mm')
    },
    displayEndTime() {
      return this.$moment(this.bookingData.time_end).format('HH:mm')
    },
  },
}
</script>
<style scoped>
</style>