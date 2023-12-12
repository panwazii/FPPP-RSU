<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateEquipmentStock"
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
        <!-- this is room {{ rooms }} -->
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-pencil</v-icon>
          แก้ไขสต็อกอุปกรณ์
        </v-card-title>
        <!-- {{ data }} -->
        <!-- <hr> -->
        <!-- {{equipments}} -->
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
                      <h4>หมายเลขซีเรียล</h4>
                      <v-text-field
                        v-model="data.serial_number"
                        :rules="[(v) => !!v || 'serial number required']"
                        label="Serial number"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ราคา</h4>
                      <v-text-field
                        v-model="data.price"
                        :rules="[(v) => !!v || 'โปรดระบุราคา']"
                        label="Price"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ห้อง</h4>
                      <v-autocomplete
                        v-model="data.room_id"
                        :rules="[(v) => !!v || 'โปรดระบุห้อง']"
                        :items="rooms"
                        item-text="name"
                        item-value="id"
                        label="Room id"
                        outlined
                        required
                        class="rounded-xl"
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
                      <v-img
                        :src="roomDisplayImage"
                        class="disimg"
                        :contain="true"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" sm="12"
                      ><v-divider class="mb-3"></v-divider
                    ></v-col>

                    <v-col cols="12" sm="12">
                      <h4>อุปกรณ์</h4>
                      <v-autocomplete
                        v-model="data.equipment_info_id"
                        :rules="[(v) => !!v || 'โปรดระบุอุปกรณ์']"
                        :items="equipments"
                        item-text="name"
                        item-value="id"
                        label="Equipment info id"
                        outlined
                        required
                        class="rounded-xl"
                      >
                        <template v-slot:item="{ item }">
                          <v-img :src="item.picture" class="itemimg"></v-img>
                          {{ item.name }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-img
                        :src="equipmentDisplayImage"
                        class="disimg"
                        :contain="true"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>ผู้ผลิต</h4>
                      <v-autocomplete
                        v-model="data.supplier_id"
                        :rules="[(v) => !!v || 'supplier id required']"
                        :items="suppliers"
                        item-text="name"
                        item-value="id"
                        label="Supplier id"
                        outlined
                        required
                        class="rounded-xl"
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
    // method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
      //   type: String,
    },
  },
  async fetch() {
    const getRooms = await this.$store.dispatch('api/admin/getDropdownRoom')
    // console.log(getRooms);
    this.rooms = getRooms.rooms
    const getEquipment = await this.$store.dispatch(
      'api/admin/getDropdownEquipmentInfo'
    )
    this.equipments = getEquipment.equipments
    const getAllSupplier = await this.$store.dispatch(
      'api/admin/getAllSupplier',
      {
        params: {
          limit: this.itemsPerPage,
          page: this.page,
        },
      }
    )
    this.suppliers = getAllSupplier.suppliers
    this.totalPages = getAllSupplier.total_pages
    this.equipments.forEach((equipment) => {
      if (equipment.id === this.data.equipment_info_id) {
        this.equipmentDisplayImage = equipment.picture
      }
    })
    this.rooms.forEach((room) => {
      if (room.id === this.data.room_id) {
        this.roomDisplayImage = room.picture[0].url
      }
    })
  },
  data() {
    return {
      roomDisplayImage: null,
      equipmentDisplayImage: null,
      rooms: [],
      equipments: [],
      suppliers: [],
      modal: {
        confirm: { open: false, message: 'Confirm this change?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Complete' },
        error: { open: false, message: '' },
      },
    }
  },
  async mounted() {},
  computed: {
    formWatched() {
      return Object.assign({}, this.data)
    },
    getRoomPicture() {
      this.rooms.forEach((room) => {
        if (room.id === data.room_id) {
          console.log('this is room', room)
          return room.picture[0].url
        }
      })
    },
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
      this.modal.confirm.open = true
    },
    cancel() {
      this.$emit('update:editEquipmentStock', false)
    },
    async updateEquipmentStock() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/updateEquipmentStock', this.data)
        this.$emit('update:editEquipmentStock', false)
        this.modal.loading.open = false
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editEquipmentStock', false)
      }
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
