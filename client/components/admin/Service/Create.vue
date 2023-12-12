<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createService"
      :confirm.sync="modal.confirm.open"
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
          <v-icon justify="left" class="mr-3" size="50">mdi-home-plus</v-icon>
          เพิ่มบริการใหม่
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="form.title"
                        :rules="[(v) => !!v || 'โปรดระบุหัวข้อบริการ']"
                        label="บริการ"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-textarea
                        v-model="form.details"
                        :rules="[(v) => !!v || 'โปรดระบุรายละเอียดบริการ']"
                        label="รายละเอียด"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-file-input
                      v-model="form.file"
                      label="รูปภาพ"
                      filled
                      prepend-icon="mdi-camera"
                      class="rounded-xl"
                    ></v-file-input>
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
            @click="confirm"
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
    open: {
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: null,
        details: null,
        available_status: true,
      },
      readers: [],
      modal: {
        confirm: { open: false, message: 'Confirm to create?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create Service complete' },
        error: { open: false, message: '' },
      },
    }
  },
  methods: {
    confirm() {
      this.modal.confirm.open = true
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createService', false)
    },
    async createService() {
      try {
        this.modal.loading.open = true
        let file = new FormData()
        file.append('file', this.form.file),
          file.append('title', this.form.title),
          file.append('details', this.form.details)
        await this.$store.dispatch('api/admin/createService', file)
        this.clearForm()
        this.$emit('update:createService', false)
        this.modal.loading.open = false
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:createService', false)
      }
    },
    clearForm() {
      this.form.title = null
      this.form.details = null
      this.form.picture = 'beta'
      this.form.available_status = true
    },
  },
}
</script>
