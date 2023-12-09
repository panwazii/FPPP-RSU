<template>
  <div>
    <SharedGoToLoginModal
      :open="modal.goToLogin.open"
      :message="modal.goToLogin.message"
      :goToLogin.sync="modal.goToLogin.open"
    />
    <v-card max-width="300" class="rounded-xl">
      <v-hover>
        <template v-slot:default="{ hover }">
          <div>
            <v-img
              contain
              aspect-ratio="1.3333"
              :src="displayImage"
              class="rounded-t-xl"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute>
                  <v-btn @click="$router.push('/user/news/' + id)"
                    >ดูรายละเอียด</v-btn
                  >
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </div>
        </template>
      </v-hover>
      <v-divider></v-divider>
      <v-card-title class="justify-center">
        <div class="line-clamp">{{ title }}</div>
      </v-card-title>
      <v-card-text class="justify-space-around d-flex">
        <div class="text-subtitle-1 font-weight-bold line-clamp-details">
          {{ details }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal: {
        goToLogin: {
          open: false,
          message: 'กรุณาเข้าสู่ระบบเพื่อใช้งานบริการทั้งหมด',
        },
      },
    }
  },
  computed: {
    displayImage() {
      if (this.picture === null) {
        return require('~/static/img/default/no-image.png')
      } else {
        return this.picture
      }
    },
  },
  props: {
    id: {
      type: String,
      default: () => '',
    },
    picture: {
      type: String,
      default: () => require('~/static/img/default/no-image.png'),
    },
    title: {
      type: String,
      default: () => 'n/a',
    },
    details: {
      type: String,
      default: () => 'n/a',
    },
  },
  methods: {},
}
</script>
<style scoped>
.line-clamp {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.line-clamp-details {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
