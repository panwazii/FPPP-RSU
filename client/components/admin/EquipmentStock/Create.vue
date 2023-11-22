<template>
  <div>
    <ModalConfirm
      :open="confirmModal"
      :message="confirmMessage"
      :method="createEquipmentStock"
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
          <v-icon justify="left" class="mr-3" size="50">mdi-home-plus</v-icon>
          Create new equipment stock.
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>หมายเลขซีเรียล</h4>
                      <v-text-field
                        v-model="form.serial_number"
                        :rules="[(v) => !!v || 'serial number required']"
                        label="Serial number"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ราคา</h4>
                      <v-text-field
                        v-model="form.price"
                        :rules="[(v) => !!v || 'price required']"
                        label="Price"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ห้อง</h4>
                      <v-autocomplete
                        v-model="form.room_id"
                        :rules="[(v) => !!v || 'room id required']"
                        :items="rooms"
                        item-text="name"
                        item-value="id"
                        label="Room id"
                        outlined
                        required
                      >
                        <template v-slot:item="{ item }">
                          <v-img
                            :src="item.picture[0].url"
                            class="itemimg"
                          ></v-img>
                          {{ item.name }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-img :src="roomDisplayImage" class="disimg" :contain="true"></v-img>
                    </v-col>
                    <v-col cols="12" sm="12"><v-divider class="mb-3"></v-divider></v-col>
                    
                    <v-col cols="12" sm="12">
                      <h4>อุปกรณ์</h4>
                      <v-autocomplete
                        v-model="form.equipment_info_id"
                        :rules="[(v) => !!v || 'equipment info id required']"
                        :items="equipments"
                        item-text="name"
                        item-value="id"
                        label="Equipment info id"
                        outlined
                        required
                      >
                        <template v-slot:item="{ item }">
                          <v-img :src="item.picture" class="itemimg"></v-img>
                          {{ item.name }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-img :src="equipmentDisplayImage" class="disimg" :contain="true"></v-img>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ผู้ผลิต</h4>
                      <v-autocomplete
                        v-model="form.supplier_id"
                        :rules="[(v) => !!v || 'supplier id required']"
                        :items="suppliers"
                        item-text="name"
                        item-value="id"
                        label="Supplier id"
                        outlined
                        required
                      ></v-autocomplete>
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
    open: {
      required: true,
    },
  },
  async fetch() {
    const getRooms = await this.$store.dispatch('api/admin/getDropdownRoom')
    this.rooms = getRooms.rooms
    const getEquipment = await this.$store.dispatch('api/admin/getDropdownEquipmentInfo')
    this.equipments = getEquipment.equipments
    const getAllSupplier = await this.$store.dispatch('api/admin/getAllSupplier', {
      params: {
        limit: this.itemsPerPage,
        page: this.page,
      },
    })
    this.suppliers = getAllSupplier.suppliers
    this.totalPages = getAllSupplier.total_pages
  },
  data() {
    return {
      roomDisplayImage: null,
      equipmentDisplayImage: null,
      form: {
        serial_number: null,
        price: null,
        room_id: null,
        equipment_info_id: null,
        supplier_id: null,
        available_status: true,
      },
      rooms: [],
      equipments: [],
      suppliers: [],

      readers: [],
      confirmModal: false,
      confirmMessage: 'Confirm this change',
      loading: false,
      loadingMessage: 'Loading',
    }
  },
  mounted() {

  },
  computed: {
    formWatched () {
        return Object.assign({}, this.form)
    }
  },
  watch: {
    formWatched: {
      handler(newValue, oldValue) {
        if (newValue.room_id !== oldValue.room_id) {
          this.rooms.forEach((room) => {
            if (room.id === newValue.room_id) {
              this.roomDisplayImage = room.picture[0].url
            }
          })
        }
        if (newValue.equipment_info_id !== oldValue.equipment_info_id) {
          this.equipments.forEach((equipment) => {
            if (equipment.id === newValue.equipment_info_id) {
              this.equipmentDisplayImage = equipment.picture
            }
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    confirm() {
      this.confirmModal = true
    },
    cancel() {
      this.clearForm()
      this.$emit('update:createEquipmentStock', false)
    },
    async createEquipmentStock() {
      try {
        this.loading = true
        console.log("I'm :", this.form)
        await this.$store.dispatch('api/admin/createEquipmentStock', this.form)
        this.clearForm()
        this.$emit('update:createEquipmentStock', false)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$emit('update:createEquipmentStock', false)
      }
    },
    clearForm() {
      this.form.serial_number = null
      this.form.price = null
      this.form.room_id = null
      this.form.equipment_info_id = null
      this.form.supplier_id = null
      this.form.available_status = true
    },
  },
}
</script>
  
  <style scoped>
.itemimg {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.disimg {
  max-height: 200px;
}
</style>