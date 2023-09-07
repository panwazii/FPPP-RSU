<template>
  <div>
    <section>
      <div class="container">
        <div class="center">
          <a>CONTAC US !</a>
          <div class="container card">
            <div class="row justify-content-center">
              <div class="col-sm-12 col-lg-6 col-md-8 mb-2">
                <div class="contact-info-wrap">
                  <div class="contact-title">
                    <h1>ติดต่อ</h1>
                    <p>
                      Prototypes may also be exempted from some requirements
                      that will applt toPrototypes may also be exempted from
                      some requirements that will applt toPrototypes may also be
                      exempted from some requirements that will applt to
                    </p>
                  </div>
                  <ul>
                    <div class="content">
                      <p>
                        <v-icon class="mr-2" large>mdi-email</v-icon>
                        contact@company.com
                      </p>
                    </div>

                    <div class="content">
                      <p>
                        <v-icon class="mr-2" large>mdi-phone</v-icon>
                        0892783278
                      </p>
                    </div>

                    <div class="content">
                      <p>
                        <v-icon class="mr-2" large>mdi-map-marker</v-icon>
                        มหาวิทยาลัยรังสิต
                      </p>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <v-avatar class="justify-center" size="400" rounded="0">
              <v-img
                src="https://race.nstru.ac.th/home_ex/blog/pic/cover/s841.jpg"
              ></v-img>
            </v-avatar>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  background-image: url(~/static/img/index/cheering_man_mono.png);
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
  color: black;
  text-align: center;
  vertical-align: top;
  font-family: Fantasy;
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
