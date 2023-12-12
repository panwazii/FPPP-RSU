<template>
  <div>
    <SharedBreadCrumbs title="ตะกร้า" :routes="routes" />
    <v-card min-height="1250" class="rounded-xl mt-2 pa-4">
      <v-card
        class="rounded-xl mb-2"
        height="120"
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
        <div class="d-flex justify-start">
          <div class="d-flex">
            <v-img
              class="rounded-xl"
              contain
              height="100"
              width="133"
              aspect-ratio="1.3333"
              :src="item.equipment.picture"
            />
            <div>
              <v-card-title>{{ item.equipment.name }}</v-card-title>
              <v-card-subtitle>tesasdasdasdt</v-card-subtitle>
            </div>
          </div>
        </div>
        <v-card-actions class="d-flex justify-end">
          <v-btn>test</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'ตะกร้า',
    }
  },
  data() {
    return {
      routes: [
        { id: 1, name: 'หน้าหลัก', to: '/user/home' },
        { id: 2, name: 'ตะกร้า', to: '/user/cart' },
      ],
      cartItems: this.$store.getters.getCartItems,
    }
  },
}
</script>