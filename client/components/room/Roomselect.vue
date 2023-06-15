<template>
  <v-card width="1020" height="220">
    <div class="d-flex flex-no-wrap justify-space-between rounded-lg">
      <div>
        <v-card-title class="text-h5"> {{ name }} </v-card-title>

        <v-card-subtitle>{{ detail }}</v-card-subtitle>

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
      </div>

      <v-avatar class="mt-12 mr-sm-16 rounded-xl" size="125">
        <v-img :src="picture"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: () => '',
    },
    picture: {
      type: String,
      default: () => '',
    },
    name: {
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