<template>
  <div>
    <v-card max-width="300" class="rounded-xl">
      <v-hover>
        <template v-slot:default="{ hover }">
          <div>
            <v-img
              contain
              aspect-ratio="1.3333"
              :src="displayImage"
              class="rounded-t-xl"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute>
                  <v-btn @click="$router.push('/user/equipments/' + id)"
                    >ดูรายละเอียด</v-btn
                  >
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </div>
        </template>
      </v-hover>
      <v-divider></v-divider>
      <v-card-title class="justify-center">
        <div class="line-clamp">{{ title }}</div>
      </v-card-title>
      <!-- <v-card-text class="justify-space-around d-flex">
        <div class="text-subtitle-1 font-weight-bold">ราคา</div>
        <div>
          <v-chip class="text-subtitle-1 font-weight-bold">
            {{ price }} บาท
          </v-chip>
        </div>
      </v-card-text> -->
      <v-card-actions class="justify-center">
        <v-btn
          v-if="!checkAvailableItems"
          elevation="0"
          max-width="200"
          class="rounded-xl px-4"
          dark
          @click="$store.dispatch('addCartItem', id)"
        >
          <v-icon>mdi-cart-plus</v-icon>เพิ่มลงตระกร้า
        </v-btn>
        <v-btn
          v-if="checkAvailableItems"
          elevation="0"
          max-width="200"
          class="rounded-xl px-4"
          color="red"
          @click="$store.dispatch('removeCartItem', getCartItemId)"
        >
          <v-icon>mdi-cart-remove</v-icon>ลบออกจากตระกร้า
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    displayImage() {
      if (!this.picture) {
        return require('~/static/img/default/no-image.png')
      } else {
        return this.picture
      }
    },
    checkAvailableItems() {
      // this.$store.getters.getCartItems.forEach((item) => {
      //   if (item.equipment_info_id === this.id) {
      //     console.log(this.id, '----', item.equipment_info_id)
      //     return true
      //   }
      // })
      for (let i = 0; i < this.$store.getters.getCartItems.length; i++) {
        if (this.$store.getters.getCartItems[i].equipment_info_id === this.id) {
          return true
        }
      }
      return false
    },
    getCartItemId() {
      for (let i = 0; i < this.$store.getters.getCartItems.length; i++) {
        if (this.$store.getters.getCartItems[i].equipment_info_id === this.id) {
          return this.$store.getters.getCartItems[i].id
        }
      }
    },
  },
  props: {
    id: {
      type: String,
      default: () => '',
    },
    picture: {
      type: String,
      default: () => require('~/static/img/default/no-image.png'),
    },
    title: {
      type: String,
      default: () => 'n/a',
    },
    price: {
      type: String,
      default: () => 'n/a',
    },
  },
  methods: {},
}
</script>
<style scoped>
.line-clamp {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
