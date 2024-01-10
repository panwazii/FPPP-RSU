<template>
  <v-card class="mb-4 pa-2 rounded-xl" min-height="120">
    <v-card-title class="text-h5 font-weight-bold">{{ title }}</v-card-title>
    <v-card-text class="text-subtitle-1">
      <div class="d-flex">
        <div v-for="route in routes" :key="route.id">
          <div v-if="route.id === routes.length">{{ route.name }}</div>
          <NuxtLink
            class="link"
            v-if="route.id !== routes.length"
            :to="route.to"
            >{{ route.name }}</NuxtLink
          >
          <v-icon v-if="route.id !== routes.length && routes.length !== 1"
            >mdi-chevron-right</v-icon
          >
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: () => 'n/a',
    },
    routes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {},
}
</script>
<style scoped>
.link {
  text-decoration: none;
  color: black;
}
</style>