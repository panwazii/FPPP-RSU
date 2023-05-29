<template>
  <div>
    <ModalsConfirmDialogModal
      :open="AddUserConfirmDialog"
      :method="addCategory"
      :message="AddUserConfirmDialogMessage"
      :confirmDialog.sync="AddUserConfirmDialog"
    />
    <div class="d-flex justify-end">
      <v-btn @click="AddUserDialog = true" class="mr-3 mb-2" color="primary"
        ><v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มผู้ใช้งาน</h4></v-btn
      >
    </div>
    <v-dialog
      v-model="AddUserDialog"
      persistent
      scrollable
      :retain-focus="false"
      max-width="900"
      max-height="500"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-account-plus</v-icon
          >
          เพิ่มผู้ใช้งาน User
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <p>ชื่อผู้ใช้งาน</p>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="firstname"
                        :rules="[(v) => !!v || 'โปรดระบุชื่อ']"
                        label="ชื่อ"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="lastname"
                        :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                        label="นามสกุล"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="id"
                        :rules="[(v) => !!v || 'โปรดระบุID']"
                        label="ID"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="password"
                        :rules="[(v) => !!v || 'โปรดระบุPassword']"
                        label="Password"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12">
                      <v-text-field
                        v-model="phone"
                        :rules="[(v) => !!v || 'โปรดระบุเบอร์โทรศัพท์']"
                        label="Phone"
                        outlined
                        required
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="
              AddUserConfirmDialog = true
              AddUserConfirmDialogMessage = `ยืนยันการเพิ่มผู้ใช้งาน ?`
            "
            class="font-weight-medium mt-1"
          >
            <v-icon class="mr-1" medium> mdi-content-save </v-icon>
            เพิ่มผู้ใช้งาน
          </v-btn>
          <v-btn
            color="error"
            @click="AddUserDialog = false"
            class="font-weight-medium mt-1"
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
  head() {
    return {
      title: 'จัดการผู้ใช้งาน',
    }
  },
  data() {
    return {
      valid: true,
      name: 'GAY',
      firstname: 'BLACK',
      lastname: 'GUY',
      id: 'ตัวดำๆ',
      password: '5555',
      phone: '191',
      loadingDialog: false,
      AddUserDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
      AddUserConfirmDialog: false,
      AddUserConfirmDialogMessage: '',
    }
  },
}
</script>
<style></style>
