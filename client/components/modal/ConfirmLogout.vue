<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="500"
    max-height="300"
  >
    <v-card class="rounded-xl">
      <v-card-title class="text-h5"
        ><v-icon justify="left" class="mr-3" size="50">mdi-logout-variant</v-icon>
        ออกจากระบบ ?
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="confirm" class="rounded-xl font-weight-medium mt-3">
          ตกลง
        </v-btn>
        <v-btn color="primary" @click="cancel" class="rounded-xl font-weight-medium mt-3">
          ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    method: { type: Function },
    open: {
      required: true,
    },
    message: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      // open: false,
      // message: '',
    }
  },
  methods: {
    confirm() {
      this.method()
      this.$emit('update:confirmLogout', false)
    },
    cancel() {
      this.$emit('update:confirmLogout', false)
    },
  },
}
</script>