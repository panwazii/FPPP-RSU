<template>
  <div>
    <SharedBreadCrumbs title="จัดการแก้ไขข้อมูลหน้าเว็บไซต์" :routes="routes" />
    <v-card min-height="550" class="rounded-xl mt-2 card">
      <v-card class="rounded-xl">
        <v-card-title class="text-h5">
          <v-icon justify="left" class="mr-3" size="50">mdi-home-plus</v-icon>
          แก้ไขข้อมูลสำหรับการติดต่อ
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center">
            <v-col>
              <template>
                <v-form ref="form" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <h4>แก้ไขข้อมูล Contact Email</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Email required']"
                        label="Email"
                        v-model="contact_email"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>แก้ไขข้อมูล Contact Description</h4>
                      <v-textarea
                        :rules="[(v) => !!v || 'Contact Description required']"
                        label="Contact Description"
                        v-model="contact_description"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="12">
                      <h4>แก้ไขข้อมูลที่อยู่ที่สามารถติดต่อได้</h4>
                      <v-textarea
                        :rules="[(v) => !!v || 'Contact Adress required']"
                        label="Contact Adress"
                        v-model="contact_adress"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <h4>แก้ไขเบอร์โทรศัพท์ที่สามารถติดต่อได้</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Contact Tel required']"
                        label="Contact Tel"
                        v-model="contact_tel"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h4>แก้ไข Contact Location</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Contact Location required']"
                        label="Contact Location"
                        v-model="contact_location"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-3"></v-divider>
                  <v-card-title class="text-h5">
                    <v-icon justify="left" class="mr-3" size="50"
                      >mdi-home-plus</v-icon
                    >
                    แก้ไขข้อมูล Tab 1
                  </v-card-title>
                  <v-divider class="mb-3"></v-divider>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <h4>แก้ไข Title เว็บไซต์</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Title website required']"
                        label="Title website"
                        v-model="title1"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h4>แก้ไข Content เว็บไซต์</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Content website required']"
                        label="Content website"
                        v-model="content1"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      label="อัพโหลดรูปภาพ"
                      v-model="picture1"
                      filled
                      prepend-icon="mdi-camera"
                      class="rounded-xl"
                    ></v-file-input>
                  </v-col>

                  <v-divider class="mt-3"></v-divider>
                  <v-card-title class="text-h5">
                    <v-icon justify="left" class="mr-3" size="50"
                      >mdi-home-plus</v-icon
                    >
                    แก้ไขข้อมูล Tab 2
                  </v-card-title>
                  <v-divider class="mb-3"></v-divider>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6">
                      <h4>แก้ไข Title เว็บไซต์</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Title website required']"
                        label="Title website"
                        v-model="title2"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h4>แก้ไข Content เว็บไซต์</h4>
                      <v-text-field
                        :rules="[(v) => !!v || 'Content website required']"
                        label="Content website"
                        v-model="content2"
                        outlined
                        required
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-col cols="12" sm="12">
                    <v-file-input
                      label="อัพโหลดรูปภาพ"
                      v-model="picture2"
                      filled
                      prepend-icon="mdi-camera"
                      class="rounded-xl"
                    ></v-file-input>
                  </v-col>
                </v-form>
              </template>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="font-weight-medium mt-3 rounded-xl">
            ตกลง
          </v-btn>
          <v-btn color="error" class="font-weight-medium mt-3 rounded-xl">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'super-admin',
  head() {
    return {
      title: 'หน้าหลัก',
    }
  },
  computed: {},
  data() {
    return {
      routes: [{ id: 1, name: 'หน้าหลัก', to: '/' }],
      selectedType: 1,
      contact_email: '',
      contact_description: '',
      contact_adress: '',
      contact_tel: '',
      contact_location: '',
      title1: '',
      content1: '',
      picture1: 'beta',
      title2: '',
      content2: '',
      picture2: 'beta',
    }
  },
  methods: {},
}
</script>
