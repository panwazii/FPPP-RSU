<template>
  <v-card class="mx-0 ml-1 mr-1" width="250" height="250">
    <v-img :src="picture" height="100px"></v-img>
    <v-card-title> {{ name }}</v-card-title>
    <!-- <v-card-subtitle> {{ room.subtitle }} </v-card-subtitle> -->
    <v-card-actions>
      <v-btn
        class="rounded-xl"
        variant="text"
        color="white"
        @click="$router.push('/room/' + id)"
      >
        รายละเอียดเพิ่มเติม
      </v-btn>
    </v-card-actions>
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
  },
}
</script>
