<template>
  <div>
    <v-parallax height="750" :src="require('~/static/img/index/index-bg.jpg')">
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="text-h4 font-weight-bold mb-4 paralax-text">
          FACULTY OF AGRICULTURAL INNOVATION
        </h1>
        <v-btn rounded depressed>more</v-btn>
      </div>
    </v-parallax>
    <indexCarousel />
    <v-card color="transparent" elevation="0" max-width="500" class="mx-auto justify-center">
      <h1 class="text-h4 font-weight-bold mb-4 d-flex justify-center">Room</h1>
      <p class="mb-4 d-flex justify-center text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        eaque, aliquam ipsum magnam aliquid cum earum ab ex dolore labore
        quaerat maiores totam repellat id, delectus perspiciatis sunt maxime
        hic.
      </p>
    </v-card>

    <indexRoom />
    <div class="mt-15">
      <indexContact />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({}),
}
</script>
<style scoped>
.paralax-text {
  text-shadow: 2px 2px #000000;
}
</style>
