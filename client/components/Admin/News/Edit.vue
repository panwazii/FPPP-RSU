<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateUser"
      :confirm.sync="modal.confirm.open"
    />
    <ModalLoading :open="modal.loading.open" :message="modal.loading.message" />
    <ModalComplete
      :open="modal.complete.open"
      :message="modal.complete.message"
      :complete.sync="modal.complete.open"
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
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          แก้ไขข่าว
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <v-form ref="form" lazy-validation>
                <v-row class="mt-2">
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="data.title"
                      :rules="[(v) => !!v || 'โปรดระบุหัวข้อข่าว']"
                      label="หัวข้อ"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea
                      v-model="data.details"
                      :rules="[(v) => !!v || 'โปรดระบุเนื้อหาข่าว']"
                      label="เนื้อหา"
                      outlined
                      required
                      class="rounded-xl"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-img
                      class="mx-auto"
                      :src="data.picture"
                      height="250"
                      width="300"
                    ></v-img>
                  </v-col>
                  <v-file-input
                    v-model="data.file"
                    label="รูปภาพ"
                    filled
                    prepend-icon="mdi-camera"
                    class="rounded-xl"
                  ></v-file-input>
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
    data: {
      required: true,
    },
  },
  data() {
    return {
      userTypes: null,
      file: null,
      modal: {
        confirm: { open: false, message: 'Confirm this change?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Complete' },
        error: { open: false, message: '' },
      },
    }
  },
  methods: {
    confirm() {
      this.modal.confirm.open = true
      //   this.$emit('update:editRoom', false)
    },
    cancel() {
      this.$emit('update:editNews', false)
    },
    async updateUser() {
      try {
        this.modal.loading.open = true
        let file = new FormData()
        file.append('file', this.data.file),
          file.append('id', this.data.id),
          file.append('title', this.data.title),
          file.append('details', this.data.details),
          await this.$store.dispatch('api/admin/updateNews', file)
        this.$emit('update:editNews', false)
        this.modal.loading.open = false
        this.modal.complete.open = true
        this.method()
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editNews', false)
      }
    },
    convertAvailableStatus(status) {
      if (status === true) {
        return 'On'
      } else if (status === false) {
        return 'Off'
      }
    },
  },
}
</script>
