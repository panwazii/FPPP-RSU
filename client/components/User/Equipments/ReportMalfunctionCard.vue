<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :confirm.sync="modal.confirm.open"
      :method="confirm"
    />
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
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="500"
      max-height="300"
      content-class="rounded-xl"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-alert-octagon</v-icon
          >
          แจ้งอุปกรณ์เสียหาย
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-textarea
            class="rounded-xl"
            v-model="desc"
            outlined
            label="รายละเอียด"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="confirm"
            class="rounded-xl font-weight-medium mt-3"
          >
            ส่ง
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
export default {
  props: {
    data: {
      required: true,
    },
    open: {
      required: true,
    },
  },
  data() {
    return {
      desc: '',
      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการแจ้งอุปกรณ์เสียหาย',
        },
        complete: {
          open: false,
          message: '',
        },
        error: {
          open: false,
          message: '',
        },
      },
    }
  },
  methods: {
    async confirm() {
      try {
        const response = await this.$store.dispatch('api/user/createReport', {
          id: this.data.id,
          desc: this.desc,
        })
        if (response.code === 201) {
          this.$emit('update:create', false)
          this.desc = ''
          this.modal.complete.open = true
          this.modal.complete.message = 'แจ้งอุปกรณ์เสียหายสำเร็จ'
        } else {
          this.modal.error.message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก'
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    cancel() {
      this.$emit('update:create', false)
      this.desc = ''
    },
  },
}
</script>