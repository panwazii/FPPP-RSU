<template>
  <div>
    <section>
      <div class="container">
        <div class="center">
          <a>CONTAC US !</a>
          <v-container>
            <v-row justify="space-around">
              <v-card width="400">
                <v-card-text>
                  <div class="font-weight-bold ms-1 mb-2">ติดต่อ</div>
                  <div density="compact" align="start">
                    <p>
                      <v-icon class="mr-2" large>mdi-email</v-icon>
                      contact@company.com
                    </p>
                  </div>

                  <div density="compact" align="start">
                    <p>
                      <v-icon class="mr-2" large>mdi-phone</v-icon>
                      0892783278
                    </p>
                  </div>

                  <div density="compact" align="start">
                    <form action="https://goo.gl/maps/RJpNVzsw6NqJtpfy6">
                      <button type="submit">
                        <v-icon class="mr-2" large>mdi-map-marker</v-icon>
                      </button>
                      <span>มหาวิทยาลัยรังสิต</span>
                    </form>
                  </div>

                  <div class="mt-5" density="compact" align="start">
                    <p>
                      52 347 ถ. พหลโยธิน ตำบล หลักหก อำเภอเมืองปทุมธานี ปทุมธานี
                      12000
                    </p>
                  </div>
                </v-card-text>
              </v-card>
            </v-row>
            <v-img
              width="550"
              max-width="600"
              src="https://www.mangozero.com/wp-content/uploads/2017/10/creating-a-facebook-page.jpg"
              class="mx-12"
            />
          </v-container>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    image: require('@/static/img/index/1071.png'),
  }),
}
</script>

<style scoped>
section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: 90%;
}
.container {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}

.center {
  top: 50%;
  left: 50%;
  text-align: center;
  /* bring your own prefixes */
}

.center a {
  position: relative;
  font-size: 150px;
  color: rgb(0, 0, 0);
  text-align: center;
  vertical-align: top;
  font-family: Tahoma (sans-serif);
}

.left {
  width: 50%;
  height: 600px;
  text-align: center;

  background-color: #ffffff;
  border-radius: 8px;
}
.right {
  width: 200%;
  height: 800px;
  background-image: url(~/static/img/index/872.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: white;
  margin-left: 50px;
}

.card {
  background-color: #ffffff;
  opacity: 0.8;
  text-align: center;
  text-justify: left;
}

@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    margin: 0 20px;
  }
  .left {
    width: 100%;
    height: 400px;
  }
  .right {
    width: 90%;
    margin: 0;
    margin-top: -100px;
  }
}
</style>
