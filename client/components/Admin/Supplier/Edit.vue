<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateSupplier"
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
          แก้ไขผู้ผลิต
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
                  <p>equipment Stock</p>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>ชื่อผู้ผลิต</h4>
                      <v-text-field
                        v-model="data.name"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อผู้ผลิต']"
                        label="Serial number"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ข้อมูลการติดต่อ</h4>
                      <v-text-field
                        v-model="data.contact_info"
                        :rules="[(v) => !!v || 'โปรดระบุข้อมูลการติดต่อ']"
                        label="ข้อมูลการติดต่อ"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
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
            @click="confirm"
            class="font-weight-medium mt-3 rounded-xl"
          >
            ตกลง
          </v-btn>
          <v-btn
            color="error"
            @click="cancel"
            class="font-weight-medium mt-3 rounded-xl"
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
        confirm: { open: false, message: 'Confirm this change' },
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
      this.$emit('update:editSupplier', false)
    },
    async updateSupplier() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/updateSupplier', this.data)
        this.$emit('update:editSupplier', false)
        this.modal.loading.open = false
        this.method()
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editSupplier', false)
      }
    },
  },
}
</script>
