<template>
  <div class="icard-container">
    <a @click="$router.push('/news/' + id)">
      <div class="icard">
        <div class="card-title line-clamp">{{ name }}</div>
        <div class="card-text text-left desc">
          {{ detail }}
        </div>
      </div>
    </a>
  </div>
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
    detail: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.line-clamp {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 60px;
}

.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  max-height: 70px;
}

.icard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.icard {
  width: 350px;
  height: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.3s ease-in;
}
.icard > * {
  padding: 10px;
}
.icard .card-image {
  height: 150px;
  width: 150px;
  background-position: center center;
  background-size: cover;
}
.icard .card-title {
  font-size: 1rem;
  text-transform: uppercase;
  text-shadow: 1px 0px 2px #262654;
}

.icard .card-text {
  line-height: 20px;
  font-size: 400;
}
</style>
