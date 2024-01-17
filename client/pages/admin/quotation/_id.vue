<template>
  <div></div>
</template>
  
  <script>
export default {
  middleware: 'user',
  head() {
    return {
      title: 'ห้องแลป',
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  async fetch() {
    let room = await this.$store.dispatch('api/public/getSingleRoom', {
      params: { id: this.id },
    })
    if (!room) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Room Not found ' + this.id,
      })
      return
    } else {
      this.room = room.room[0]
      this.routes[2].name = room.room[0].name
      this.loading = false
    }
  },
  computed: {},
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped></style>