<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateReport"
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
          แก้ไขเครื่องมือ
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="reports"
                        v-model="data.id"
                        item-text="name"
                        item-value="id"
                        label="ห้อง"
                        outlined
                        class="rounded-xl"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.user_id"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อเครื่องมือ']"
                        label="ชื่อเครื่องมือ"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.equipment_info_id"
                        :rules="[(v) => !!v || 'โปรดระบุราคาเฉลี่ย']"
                        label="ราคาเฉลี่ย"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.fix_status"
                        :rules="[(v) => !!v || 'โปรดระบุราคาเช่า']"
                        label="ราคาเช่า"
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
    data: {
      required: true,
      //   type: String,
    },
  },
  async fetch() {
    const Reports = await this.$store.dispatch('api/admin/getAllReport')
    this.reports = Reports.reports
  },
  data() {
    return {
      reports: null,
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
      this.$emit('update:editReport', false)
    },
    async updateReport() {
      try {
        this.modal.loading.open = true
        let file = new FormData()
        file.append('id', this.data.id),
          file.append('user_id', this.data.user_id),
          file.append('equipment_info_id', this.data.equipment_info_id),
          file.append('desc', this.data.desc),
          file.append('fix_status', this.data.fix_status),
          await this.$store.dispatch('api/admin/updateReport')
        this.$emit('update:editReport', false)
        this.modal.loading.open = false
        this.method()
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editReport', false)
      }
    },
  },
}
</script>
