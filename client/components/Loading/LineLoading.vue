<template>
  <div>
    <v-overlay :value="loadingDialog"></v-overlay>
    <div class="text-center">
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="#056839" dark>
          <v-card-text>
            message
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
    loading: {
      required: true,
    },
    message: {
      required: true,
      type: String,
    },
  },
}
</script>