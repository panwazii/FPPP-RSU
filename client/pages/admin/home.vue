<template>
  <v-container>
    <div><adminManageUser /></div>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: 'admin home',
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