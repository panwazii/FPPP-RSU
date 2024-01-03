<template>
  <v-main class="center">
    <div class="d-flex justify-content-center">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
    </div>
    <p>error : {{ error.message }}</p>
    <div class="d-flex justify-end mt-6">
      <v-btn class="rounded-xl" color="primary" @click="backHome()">
        กลับหน้าหลัก
      </v-btn>
    </div>
  </v-main>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 ไม่พบหน้าที่ต้องการค้นหา',
      otherError: 'เกิดข้อผิดพลาดที่ไม่รู้จัก',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    backHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.center {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
h1 {
  font-size: 40px;
}
</style>