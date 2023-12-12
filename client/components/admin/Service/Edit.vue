<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateService"
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
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          แก้ไขบริการ
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <p>ID</p>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="data.id"
                        disabled
                        label="ID"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <p>บริการ</p>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="data.title"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อบริการ']"
                        label="บริการ"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-textarea
                        v-model="data.details"
                        :rules="[(v) => !!v || 'โปรดระบุรายละเอียดบริการ']"
                        label="รายละเอียด"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row>
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
    // method: { type: Function },
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
    confirm() {
      this.modal.confirm.open = true
    },
    cancel() {
      this.$emit('update:editService', false)
    },
    async updateService() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/updateService', this.data)
        this.$emit('update:editService', false)
        this.modal.loading.open = false
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editService', false)
      }
    },
  },
}
</script>
