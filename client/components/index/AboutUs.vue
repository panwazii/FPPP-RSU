<template>
  <div class="indexcard-container">
    <a @click="$router.push('/room/' + id)">
      <div class="indexcard">
        <div class="card-image">
          <v-img :src="picture"> </v-img>
        </div>
        <div class="card-title">{{ name }}</div>
        <div class="card-text text-center">
          {{ detail }}
        </div>
      </div>
    </a>
  </div>
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
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
