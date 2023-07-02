<template>
  <body>
    <section>
      <div class="hovercontainer">
        <div class="card">
          <div class="content">
            <div class="imgBx">
              <v-img :src="picture" height="100px"></v-img>
            </div>
            <div class="contentBx">
              <h3>{{ name }}</h3>
            </div>
          </div>
          <ul class="sci">
            <li>
              <a href="">รายละเอียดเพิ่มเติม</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </body>
</template>
<script>
export default {
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    id: {
      type: String,
      default: () => '',
    },
  },
}
</script>
