<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createRoom"
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
          เพิ่มห้องใหม่
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>ชื่อห้อง</h4>
                      <v-text-field
                        v-model="form.name"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อห้อง']"
                        label="Name"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <h4>ค่าเช่าห้อง</h4>
                      <v-text-field
                        v-model="form.rent_price"
                        :rules="[(v) => !!v || 'โปรดระบุราคาเช่าห้อง']"
                        label="Rent price"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>รายละเอียด</h4>
                      <v-textarea
                        v-model="form.details"
                        :rules="[(v) => !!v || 'โปรดระบุรายละเอียดห้อง']"
                        label="Details"
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
  method: { type: Function },
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
        rent_price: null,
        available_status: true,
      },
      readers: [],
      modal: {
        confirm: { open: false, message: 'Confirm this change?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create user complete' },
        error: { open: false, message: '' },
      },
    }
  },
  methods: {
    confirm() {
      this.modal.confirm.open = true
      //   this.$emit('update:editRooms', false)
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createRoom', false)
    },
    async createRoom() {
      try {
        this.modal.loading.open = true
        let file = new FormData()
        file.append('file', this.form.file),
          file.append('name', this.form.name),
          file.append('rent_price', this.form.rent_price),
          file.append('details', this.form.details)
        await this.$store.dispatch('api/admin/createRoom', file)
        this.clearForm()
        this.$emit('update:createRoom', false)
        this.modal.loading.open = false
        this.method()
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:createRoom', false)
      }
    },
    clearForm() {
      this.form.name = null
      this.form.details = null
      this.form.rent_price = null
      this.form.picture = 'beta'
      this.form.available_status = true
    },
  },
}
</script>
