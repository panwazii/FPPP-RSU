<template>
  <v-dialog persistent :retain-focus="false" v-model="open" max-width="500" max-height="300">
    <v-card>
      <v-card-title class="text-h5"
        ><v-icon justify="left" class="mr-3" size="50">mdi-alert</v-icon>
        ข้อผิดพลาด
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click.stop="confirm"
          class="font-weight-medium mt-3"
        >
          ปิด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      message: '',
      resolver: () => null,
    }
  },
  mounted() {
    this.$nuxt.$on('errorDialog', this.dialog)
  },
  methods: {
    confirm() {
      this.close()
    },
    cancel() {
      this.close()
    },
    close() {
      this.open = false
    },
    dialog({ message, open, resolver }) {
      this.message = message
      this.open = open
      this.resolver = resolver
    },
  },
}
</script>
