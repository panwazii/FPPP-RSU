<template>
  <v-card max-width="300" class="rounded-xl">
    <v-hover>
      <template v-slot:default="{ hover }">
        <div>
          <v-img
            contain
            aspect-ratio="1.3333"
            :src="displayImage"
          >
            <v-fade-transition class="rounded-lx">
              <v-overlay class="rounded-lx" v-if="hover" absolute>
                <v-btn @click="$router.push('/equipments/' + id)">ดูรายละเอียด</v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </div>
      </template>
    </v-hover>
    <v-divider></v-divider>
    <v-card-title class="justify-center">
      {{ title }}
    </v-card-title>
    <v-card-text class="justify-space-around d-flex">
      <div class="text-subtitle-1 font-weight-bold">ราคา</div>
      <div>
        <v-chip class="text-subtitle-1 font-weight-bold">
          {{ price }} บาท
        </v-chip>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn elevation="0" max-width="200" class="rounded-xl px-4" dark>
        <v-icon>mdi-cart-plus</v-icon>เพิ่มลงตระกร้า
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      // overlay: false,
    }
  },
  computed: {
    displayImage() {
      if (this.picture === null) {
        return require('~/static/img/default/no-image.png')
      } else {
        return this.picture
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
</style>
