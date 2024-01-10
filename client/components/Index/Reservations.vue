<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :confirm.sync="confirmModal"
    />
    <ModalLoading :open="loading" :message="loadingMessage" />
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
          จองห้อง
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" lazy-validation>
                  <h1>ชื่อห้อง</h1>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.name"
                        :rules="[(v) => !!v || 'name required']"
                        label="Name"
                        disabled
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="data.details"
                        :rules="[(v) => !!v || 'details required']"
                        label="Details"
                        disabled
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <h1>ข้อมูลผู้จอง</h1>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="fname"
                        :rules="[(v) => !!v || 'name required']"
                        label="ชื่อผู้จอง"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="lname"
                        :rules="[(v) => !!v || 'last name required']"
                        label="นามสกุลผู้จอง"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="tell"
                        label="เบอร์โทรศัพท์ผู้ใช้งาน"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="address"
                        label="ที่อยู่ผู้ใช้งาน"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <h1>วันที่ต้องการจอง</h1>
                  <v-row class="mt-2 justify-center">
                    <v-date-picker show-adjacent-months></v-date-picker>
                  </v-row>

                  <h1 class="mt-5">เวลา</h1>
                  <v-row class="mt-2">
                    <v-col cols="5" sm="5">
                      <v-text-field
                        v-model="start"
                        label="เริ่มต้น"
                        type="time"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5" sm="5">
                      <v-text-field
                        v-model="end"
                        label="สิ้นสุด"
                        type="time"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <h1 class="mt-3">อุปกรณ์ที่ต้องการใช้งาน</h1>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-combobox
                        v-model="equipment_select"
                        :items="items"
                        label="เลือกอุปกรณ์"
                        multiple
                        chips
                      ></v-combobox>
                    </v-col>
                  </v-row>

                  <v-row class="mt-3">
                    <v-col cols="4" sm="4">
                      <v-checkbox-btn
                        v-model="enabled"
                        class="pe-2"
                      ></v-checkbox-btn>
                      <p>ผู้ช่วย</p>
                    </v-col>
                    <v-col cols="6" sm="6">
                      <v-text-field
                        :disabled="!enabled"
                        hide-details
                        label="I only work if you check the box"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <h1 class="mt-3">หมายเหตุ</h1>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <v-textarea 
                      v-model="ext"
                      label="หมายเหตุเพิ่มเติม"
                      ></v-textarea>
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
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
      fname: '',
      lname: '',
      tell: '',
      address: '',
      items: [
        'เครื่องปอกสับปะรด',
        'เครื่องปอกมันฝรั่ง',
        'เครื่องหั่นผัก',
        'เครื่องบดย่อยชิ้นผลไม้-ผัก',
      ],
      enabled: false,
    }
  },
  methods: {
    confirm() {
      this.confirmModal = true
      //   this.$emit('update:editRoom', false)
    },
    cancel() {
      this.$emit('update:Reservations', false)
    },
  },
}
</script>
