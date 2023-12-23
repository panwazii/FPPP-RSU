<template>
  <div class="ma-4">
    <SharedBreadCrumbs title="ตะกร้า" :routes="routes" />
    <v-stepper v-model="step" class="rounded-xl">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"> Step 1 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2"> Step 2 </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Step 3 </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="rounded-xl pa-6" elevation="4">
            <v-card-title> ข้อมูลส่วนตัว </v-card-title>
            <v-card-subtitle class="subtitle-1 mb-4">
              รายละเอียดข้อมูลส่วนตัว
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.fname"
                    outlined
                    disabled
                    label="ชื่อจริง"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.lname"
                    outlined
                    disabled
                    label="นามสกุล"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.tel"
                    outlined
                    disabled
                    label="เบอร์ติดต่อ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.email"
                    outlined
                    disabled
                    label="อีเมล"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.type_id"
                    outlined
                    disabled
                    label="ประเภทผู้ใช้"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="rounded-xl"
                    v-model="etc"
                    outlined
                    label="หมายเหตุ"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-divider class="my-5"></v-divider>
            </v-card-text>

            <v-row>
              <v-col cols="12" md="6">
                <p class="subtitle-1">วันที่เริ่มจอง</p>
                <v-text-field
                  class="rounded-xl"
                  v-model="date_start"
                  outlined
                  dense
                  hide-details
                >
                  <template v-slot:append-outer>
                    <UserDatePicker v-model="date_start" />
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <p class="subtitle-1">วันที่สิ้นสุดการจอง</p>
                <v-text-field
                  class="rounded-xl"
                  v-model="date_end"
                  outlined
                  dense
                  hide-details
                >
                  <template v-slot:append-outer>
                    <UserDatePicker v-model="date_end" />
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl" color="primary" @click="step = 2">
              ต่อไป
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <v-card min-height="800" class="rounded-xl mt-2 pa-4">
              <v-card
                class="rounded-xl mb-2"
                height="150"
                v-for="item in cartItems"
                :key="item.id"
              >
                <!-- <v-list>
        <v-list-item-avatar size="90" class="ml-2">
            <v-img
            class="rounded-xl"
            contain
            height="100"
            width="133"
            aspect-ratio="1.3333"
            :src="item.equipment.picture"
          />
        </v-list-item-avatar>
      </v-list> -->

                <v-row no-gutters class="flex-nowrap bg-surface-variant">
                  <v-col cols="2" class="flex-grow-0 flex-shrink-0">
                    <v-img
                      class="rounded-xl ma-2 pa-2 align-self-center mt-5 mx-5"
                      contain
                      height="100"
                      width="133"
                      aspect-ratio="1.3333"
                      :src="item.equipment.picture"
                    />
                  </v-col>

                  <v-col
                    cols="1"
                    style="min-width: 100px; max-width: 100%"
                    class="flex-grow-1 flex-shrink-0"
                  >
                    <v-card-title>{{ item.equipment.name }}</v-card-title>
                    <v-card-subtitle>tesasdasdasdt</v-card-subtitle>
                  </v-col>

                  <v-col
                    cols="3"
                    style="min-width: 100px"
                    class="flex-grow-0 flex-shrink-1 mt-9"
                  >
                    <UserPlusMinusField
                      class="ma-2 pa-2 align-self-center"
                      :value="1"
                      :min="1"
                      :max="10"
                    ></UserPlusMinusField>
                    <v-btn color="error" class="ma-2 pa-2 align-self-center"
                      >ลบสินค้า</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </div>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl mx-5" color="primary" @click="step = 3">
              ต่อไป
            </v-btn>

            <v-btn class="rounded-xl mx-5" color="primary" @click="step = 1">
              ถอยกลับ
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="rounded-xl pa-6" elevation="4">
            <v-card-title> ยืนยันข้อมูล </v-card-title>
            <v-card-subtitle class="subtitle-1 mb-4">
              รายละเอียดการยืนยัน
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.fname"
                    outlined
                    disabled
                    label="ชื่อจริง"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.lname"
                    outlined
                    disabled
                    label="นามสกุล"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.tel"
                    outlined
                    disabled
                    label="เบอร์ติดต่อ"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.email"
                    outlined
                    disabled
                    label="อีเมล"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    class="rounded-xl"
                    v-model="UserInfo.type_id"
                    outlined
                    disabled
                    label="ประเภทผู้ใช้"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider class="mt-5 mb-5"></v-divider>
              <h1>ราคาสินค้าทั้งหมด 500 bath</h1>
              <v-divider class="mt-5 mb-5"></v-divider>
              <v-col cols="12">
                <v-textarea
                  class="rounded-xl"
                  v-model="etc"
                  outlined
                  disabled
                  label="หมายเหตุ"
                ></v-textarea>
              </v-col>
            </v-card-text>
          </v-card>

          <v-row class="justify-center mt-12 mb-12">
            <v-btn class="rounded-xl mx-5" color="primary"> ชำระเงิน </v-btn>

            <v-btn class="rounded-xl mx-5" color="primary" @click="step = 2">
              ถอยกลับ
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let Data = await this.$store.dispatch('api/user/getUserInfo', {
      params: { id: this.id },
    })
    if (!Data) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Data Not found ' + this.id,
      })
      return
    } else {
      this.UserInfo = Data.user
    }
  },
  head() {
    return {
      title: 'ตะกร้า',
    }
  },
  data() {
    return {
      step: 1,
      UserInfo: [],
      date_start: null,
      date_end: null,
      foo: 0,
      etc: '',

      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ตะกร้า', to: '/user/cart' },
      ],
      cartItems: this.$store.getters.getCartItems,
    }
  },
  methods: {
    increment() {
      this.foo = parseInt(this.foo, 10) + 1
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1
    },
  },
}
</script>
