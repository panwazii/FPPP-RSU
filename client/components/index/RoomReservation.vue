<template>
  <v-card class="card ma-2 rounded-xl" height="400px" @click="gotoRoom">
    <v-img height="250px" :src="picture" />
    <v-card-title class="justify-center">{{ name }} </v-card-title>
    <v-card-text class="justify-center">
      <div class="line-clamp-text">{{ detail }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    id: {
      type: String,
      default: () => '',
    },
    detail: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    gotoRoom() {
      this.$router.push(`/rooms/${this.id}`)
    },
  },
}
</script>

<style scoped>
.card:hover {
  background-color: rgb(224, 224, 224);
}

.line-clamp-text {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
