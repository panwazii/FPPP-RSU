<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="updateUser"
      :confirm.sync="confirmModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
    <ModalComplete
      :open="completeModal"
      :message="completeMessage"
      :complete.sync="completeModal"
    />
    <v-dialog
      persistent
      :retain-focus="false"
      v-model="open"
      max-width="650"
      max-height="300"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          Edit News
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <v-row class="d-flex justify-center mt-3">
                <v-col cols="8">
                  <v-form ref="form" lazy-validation>
                    <v-row class="mt-2">
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="data.title"
                          :rules="[(v) => !!v || 'title is required']"
                          label="หัวข้อ"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-textarea
                          v-model="data.details"
                          :rules="[(v) => !!v || 'details is required']"
                          label="เนื้อหา"
                          outlined
                          required
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
                      ></v-file-input>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
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
    data: {
      required: true,
    },
  },
  data() {
    return {
      userTypes: null,
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
      completeMessage: 'Create news complete',
      completeModal: false,
      file: null,
    }
  },
  methods: {
    confirm() {
      this.confirmModal = true
      //   this.$emit('update:editRoom', false)
    },
    cancel() {
      this.$emit('update:editNews', false)
    },
    async updateUser() {
      try {
        this.loading = true
        let file = new FormData()
        file.append('file', this.data.file),
          file.append('id', this.data.id),
          file.append('title', this.data.title),
          file.append('details', this.data.details),
          await this.$store.dispatch('api/admin/updateNews', file)
        this.$emit('update:editNews', false)
        this.loading = false
        this.completeModal = true
      } catch (error) {
        this.loading = false
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
