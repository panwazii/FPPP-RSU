<template>
  <v-container>
    <h1>hello user</h1>
  </v-container>
</template>
<script>
export default {
  layout: 'user',
  middleware: 'user',
  head() {
    return {
      title: 'user home',
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('setPathName',"home")
  },
}
</script>