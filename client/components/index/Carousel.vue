<template>
  <v-carousel max-height="400" :hide-delimiters="true" class="mt-4">
    <v-carousel-item v-for="item in items" :key="item.id">
      <v-card
        max-width="800"
        min-height="300"
        max-height="400"
        class="d-flex justify-space-around mx-auto ma-10"
      >
        <div class="d-flex flex-no-wrap justify-space-between mt-5">
          <div>
            <v-card-title class="text-h5">{{ item.title }}</v-card-title>

            <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
            <v-card-text>{{ item.content }}</v-card-text>
            <v-card-actions>
              <v-btn
                rounded
                depressed
                class="text-button"
                right
              >
                more
              </v-btn>
            </v-card-actions>
          </div>

          <v-img class="ma-3" max-width="400" max-height="350" tile>
            <v-img :src="item.src"></v-img>
          </v-img>
        </div>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        subtitle: 'Foster the People',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        id: 2,
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        subtitle: 'Ellie Goulding',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
  }),
}
</script>
<style scoped>
</style>