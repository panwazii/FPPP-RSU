<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="createProductionLine"
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
          เพิ่มไลน์การผลิต
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
                        v-model="form.name"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อไลน์การผลิต']"
                        label="ไลน์การผลิต"
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
        name: null,
        available_status: true,
      },

      readers: [],
      modal: {
        confirm: { open: false, message: 'Confirm to create?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Create Production line complete' },
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
      this.$emit('update:createProductionLine', false)
    },
    async createProductionLine() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/createProductionLine', this.form)
        this.clearForm()
        this.$emit('update:createProductionLine', false)
        this.modal.loading.open = false
        this.method()
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:createProductionLine', false)
      }
    },
    clearForm() {
      this.form.name = null
      this.form.available_status = true
    },
  },
}
</script>
