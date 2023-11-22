<template>
  <v-card class="pa-2 rounded-xl card" height="200px" @click="gotoNews(id)">
    <v-card-title>
      <div class="ml-6 text-h6 line-clamp-title">{{ name }}</div>
    </v-card-title>
    <v-card-subtitle>
      <div class="line-clamp-subtitle">
        {{ detail }}
      </div>
    </v-card-subtitle>
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
    gotoNews(id) {
      this.$router.push(`/news/${id}`)
    },
  },
}
</script>
<style scoped>
.card:hover {
  background-color: rgb(224, 224, 224);
  /* text-decoration: underline; */
}

.line-clamp-title {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-subtitle {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>
