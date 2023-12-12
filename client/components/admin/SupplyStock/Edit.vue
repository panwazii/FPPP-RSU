<template>
  <div>
    <ModalConfirm
      :open="modal.confirm.open"
      :message="modal.confirm.message"
      :method="updateSupplyStock"
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
          Edit SupplyStock
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
                    <v-col cols="12" sm="6">
                      <h4>ปริมาณ</h4>
                      <v-text-field
                        v-model="data.quantity"
                        :rules="[(v) => !!v || 'quantity required']"
                        label="Quantity"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h4>ราคา</h4>
                      <v-text-field
                        v-model="data.price"
                        :rules="[(v) => !!v || 'price required']"
                        label="Price"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>วันที่</h4>
                      <v-date-picker
                        v-model="data.date"
                        :rules="[(v) => !!v || 'date required']"
                        label="Date"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h4>อุปกรณ์</h4>
                      <v-autocomplete
                        v-model="data.supply_stock_id"
                        :rules="[(v) => !!v || 'supply stock id required']"
                        :items="equipments"
                        item-text="name"
                        item-value="id"
                        label="Supply stock id"
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
                    <v-col cols="12" sm="12">
                      <h4>หมายเหตุ</h4>
                      <v-text-field
                        v-model="data.remark"
                        :rules="[(v) => !!v || 'remark required']"
                        label="Remark"
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
    this.suppliers = getAllSupplier.supplier
    this.totalPages = getAllSupplier.total_pages
    this.equipments.forEach((equipment) => {
      if (equipment.id === this.data.equipment_info_id) {
        this.equipmentDisplayImage = equipment.picture
      }
    })
  },
  data() {
    return {
      equipmentDisplayImage: null,
      suppliers: [],
      equipments: [],
      modal: {
        confirm: { open: false, message: 'Confirm this change?' },
        loading: { open: false, message: 'Loading' },
        complete: { open: false, message: 'Complete' },
        error: { open: false, message: '' },
      },
    }
  },
  mounted() {},
  computed: {
    formWatched() {
      return Object.assign({}, this.data)
    },
  },
  watch: {
    formWatched: {
      handler(newValue, oldValue) {
        if (newValue.supply_stock_id !== oldValue.supply_stock_id) {
          this.equipments.forEach((equipment) => {
            if (equipment.id === newValue.supply_stock_id) {
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
      this.$emit('update:editSupplyStock', false)
    },
    async updateSupplyStock() {
      try {
        this.modal.loading.open = true
        await this.$store.dispatch('api/admin/updateSupplyStock', this.data)
        this.$emit('update:editSupplyStock', false)
        this.modal.loading.open = false
      } catch (error) {
        this.modal.loading.open = false
        console.log(error)
        this.$emit('update:editSupplyStock', false)
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
