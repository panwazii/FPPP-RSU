<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createNews"
      :confirm.sync="modal.confirm.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
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
      max-width="650"
      max-height="300"
    >
      <v-card class="rounded-xl">
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50"
            >mdi-newspaper-plus</v-icon
          >
          เพิ่มข่าวใหม่
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <v-form ref="form" lazy-validation>
                <v-row class="mt-2">
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="form.title"
                      :rules="[(v) => !!v || 'title is required']"
                      label="หัวข้อ"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      v-model="form.details"
                      :rules="[(v) => !!v || 'details is required']"
                      label="เนื้อหา"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-file-input
                      v-model="form.file"
                      label="รูปภาพ"
                      filled
                      prepend-icon="mdi-camera"
                      class="rounded-xl"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-form>
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
    method: { type: Function },
    open: {
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: null,
        details: null,
        picture: 'beta',
      },
      file: null,
      modal: {
        confirm: { open: false, message: 'Confirm to create?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create news complete' },
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
      this.$emit('update:createNews', false)
    },
    async createNews() {
      try {
        this.loading = true
        let file = new FormData()
        file.append('file', this.form.file),
          file.append('title', this.form.title),
          file.append('details', this.form.details)
        const Response = await this.$store.dispatch(
          'api/admin/createNews',
          file
        )
        if (Response.code === 201) {
          this.clearForm()
          this.$emit('update:createNews', false)
          this.modal.loading.open = false
          this.modal.complete.open = true
          this.method()
        } else {
          this.clearForm()
          this.$emit('update:createNews', false)
          this.modal.loading.open = false
          this.modal.error.message = Response.msg
          this.modal.error.open = true
        }
      } catch (error) {
        this.modal.loading.open = false
        this.clearForm()
        this.$emit('update:createNews', false)
        this.modal.error.message = String(error)
        this.modal.error.open = true
      }
    },
    clearForm() {
      this.form.title = null
      this.form.details = null
      this.form.picture = null
    },
  },
}
</script>
