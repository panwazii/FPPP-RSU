<template>
    <div>
      <ModalConfirm
        :open="confirmModal"
        :message="confirmMessage"
        :method="updateEquipmentStock"
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
            Edit EquipmentStock
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-text>
            <v-row class="d-flex justify-center mt-3">
              <v-col cols="8">
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
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <p>equipment Stock</p>
                    <v-row class="mt-2">
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.serial_number"
                          :rules="[(v) => !!v || 'serial number required']"
                          label="Serial"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.room_id"
                          :rules="[(v) => !!v || 'room id required']"
                          label="Room id"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="data.equipment_info_id"
                          :rules="[(v) => !!v || 'equipment info id required']"
                          label="Equipment info id"
                          outlined
                          required
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
      }
    },
    methods: {
      confirm() {
        this.confirmModal = true
      },
      cancel() {
        this.$emit('update:editEquipmentStock', false)
      },
      async updateEquipmentStock() {
        try {
          this.loading = true
          await this.$store.dispatch('api/admin/updateEquipmentStock', this.data)
          this.$emit('update:editEquipmentStock', false)
          this.loading = false
        } catch (error) {
          this.loading = false
          console.log(error)
          this.$emit('update:editEquipmentStock', false)
        }
      },
    },
  }
  </script>
  