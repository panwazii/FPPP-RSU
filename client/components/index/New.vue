<template>
  <v-col cols="12">
    <v-card outlined>
      <v-card-title class="text-h5"> {{ title }}</v-card-title>

      <v-card-subtitle> {{ details }}</v-card-subtitle>

      <v-card-actions>
        <v-btn variant="text" @click="$router.push('/news/' + id)">
          อ่านเพิ่มเติม
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    id: {
      type: String,
      default: () => '',
    },
    details: {
      type: String,
      default: () => '',
    },
  },
}
</script>
