<template>
  <div>
    <v-overlay :value="open"></v-overlay>
    <div class="text-center">
      <v-dialog v-model="open" hide-overlay persistent width="300">
        <v-card class="rounded-xl" color="#78909C" dark>
          <v-card-text>
            {{ message }}
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      required: true,
    },
    message: {
      required: true,
      type: String,
    },
  },
}
</script>