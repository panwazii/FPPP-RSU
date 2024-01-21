<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateReport"
      :confirm.sync="modal.confirm.open"
    />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :method="method"
      :complete.sync="modal.complete.open"
    />
    <ModalError
      :open="modal.error.open"
      :message="modal.error.message"
      :error.sync="modal.error.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card class="rounded-xl">
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          รายงานเครื่องมือที่ชำรุด
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="ma-1">
                    <v-col cols="12" md="4">
                      <p class="ml-4 mb-0 subtitle-2 font-weight-bold">
                        ชื่อเครื่องมือที่ชำรุด
                      </p>
                      <p class="ml-4 subtitle-1">
                        {{ data.report_equipment.name }}
                      </p>
                    </v-col>
                    <v-col cols="12" md="4">
                      <p class="ml-4 mb-0 subtitle-2 font-weight-bold">
                        ชื่อผู้ใช้ที่แจ้ง
                      </p>
                      <p class="ml-4 subtitle-1">
                        {{ data.report_user.fname }}
                      </p>
                    </v-col>
                    <v-col cols="12" md="4">
                      <p class="ml-4 mb-0 subtitle-2 font-weight-bold">
                        นามสกุลผู้ใช้ที่แจ้ง
                      </p>
                      <p class="ml-4 subtitle-1">
                        {{ data.report_user.lname }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <p class="ml-4 mb-0 subtitle-2 font-weight-bold">
                        รายละเอียดที่แจ้ง
                      </p>
                      <p class="ml-4 subtitle-1">{{ data.desc }}</p>
                    </v-col>

                    <v-col cols="12">
                      <p class="ml-4 mb-0 subtitle-2 font-weight-bold">
                        สถานะเครื่องมือ
                      </p>
                      <v-switch
                        class="ml-2"
                        v-model="data.fix_status"
                        :label="`สถานะ : ${convertFixStatus(data.fix_status)}`"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-form>
              </template>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="modal.confirm.open = true"
            class="font-weight-medium mt-3"
          >
            ตกลง
          </v-btn>
          <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
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
    method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
      //   type: String,
    },
  },
  data() {
    return {
      modal: {
        confirm: { open: false, message: 'Confirm this change?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Complete' },
        error: { open: false, message: '' },
      },
    }
  },
  methods: {
    async updateReport() {
      try {
        const response = await this.$store.dispatch('api/admin/updateReport', {
          id: this.data.id,
          status: this.data.fix_status,
        })
        if (response.code === 201) {
          this.$emit('update:editReport', false)
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
        this.$emit('update:editReport', false)
      }
    },
    cancel() {
      this.$emit('update:editReport', false)
    },
    convertFixStatus(status) {
      if (status === true) {
        return 'ซ่อมเสร็จแล้ว'
      } else if (status === false) {
        return 'ยังไม่ซ่อม'
      }
    },
  },
}
</script>
