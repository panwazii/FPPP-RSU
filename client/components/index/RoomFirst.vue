<template>
  <div>
    <section>
      <div class="bottom-right"></div>
      <div class="container">
        <div class="center">
          <a>ROOM</a>
          <div class="container card">
            <v-card class="mx-auto rounded-xl cardon" width="600 ">
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aperiam ex quam voluptate blanditiis. Libero mollitia reiciendis
                facilis molestiae, vitae saepe distinctio, quae fugiat
                perferendis doloremque provident debitis excepturi error enim!
                Quo commodi deleniti quidem quam voluptatum cupiditate
                distinctio ad perferendis eveniet dolor ea rerum numquam
                explicabo consectetur corrupti eum et, hic autem error. Non
                perspiciatis distinctio cumque, nostrum quidem hic molestias
                quas ex unde illo odio repellendus neque, exercitationem cum
                obcaecati pariatur. Enim, reiciendis illo nihil doloribus quos
                veritatis, unde pariatur tenetur modi optio veniam accusamus
                accusantium id ullam quis doloremque consectetur quasi ipsa aut
                earum. Consequatur excepturi velit nesciunt.
              </v-card-text>
            </v-card>

            <v-img width="600" max-width="600" :src="image" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require('@/static/img/index/805.png'),
    }
  },
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
  position: relative;
}

.cardon {
  z-index: 1;
}
section .bottom-right {
  bottom: -240px;
  right: -40px;
  padding: 1rem;
  position: absolute;
  background: rgb(106, 95, 73);
  border-radius: 40px;
  width: 80%;
  height: 20%;
  color: #ffffff;
  /* center overlay text */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.imgtelling {
  background-image: url(~/static/img/index/1071.png);
}
.container {
  width: 90%;
  max-width: 1600px;
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
  color: rgb(106, 95, 73);
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
