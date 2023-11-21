<template>
  <main>
    <h1 class="text-h4 font-weight-bold d-flex justify-center mt-12">
      รายการข่าว
    </h1>
    <section class="cards">
      <div
        class="card"
        v-for="(news, index) in datanew"
        :key="news.id"
        @click="$router.push('/new/' + news.id)"
      >
        <div class="card__image-container">
          <img :src="news.picture" />
        </div>
        <div class="card__content">
          <p class="card__title text--medium">
            {{ news.title }}
          </p>
          <div class="card__info">
            <p class="text--medium">{{ news.details }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  mounted() {
    this.fetchrooms()
  },
  data() {
    return {
      datanew: [],
    }
  },
  methods: {
    async fetchrooms() {
      let datanew = await this.$store.dispatch('api/public/getAllNews')
      this.datanew = datanew.news
    },
  },
}
</script>

<style scoped>
main {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: 100%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: #303032;
}

main {
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(auto, 60px)) 1fr;
  grid-gap: 40px;
  padding: 60px 0;
}

.text--medium {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #ecf0f1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  max-height: 70px;
}

.cards {
  grid-column: 2 / span 12;
  display: grid;
  grid-template-columns: repeat(12, minmax(auto, 60px));
  grid-gap: 40px;
}

.card {
  grid-column-end: span 4;
  display: flex;
  flex-direction: column;
  background-color: #39393b;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.card:hover {
  transform: translateY(-7px);
}

.card__image-container {
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  position: relative;
}

.card__image-container img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card__content {
  padding: 20px;
}

.card__title {
  margin-bottom: 20px;
}

.card__info {
  display: flex;
  align-self: end;
  align-items: center;
}

.card__price {
  margin-left: auto;
  padding: 5px 20px;
  background-color: #303032;
  border-radius: 10px;
}

@media only screen and (max-width: 1000px) {
  .card {
    grid-column-end: span 6;
  }
}

@media only screen and (max-width: 700px) {
  main {
    grid-gap: 20px;
  }
  .card {
    grid-column-end: span 12;
  }
}

@media only screen and (max-width: 500px) {
  main {
    grid-template-columns: 10px repeat(6, 1fr) 10px;
    grid-gap: 10px;
  }
  .cards {
    grid-column: 2 / span 6;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;
  }
  .card {
    grid-column-end: span 6;
  }
}
</style>
