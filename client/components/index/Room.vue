<template>
  <div class="mt-10 d-flex justify-center">
    <v-container>
      <v-row>
        <v-col
          class="mx-auto d-flex justify-center"
          cols="12"
          sm="4"
          md="3"
          xs="1"
          v-for="room in rooms"
          :key="room.id"
        >
          <v-card class="mx-auto ml-1 mr-1" max-width="250" max-height="250">
            <v-img :src="room.src" height="100px"></v-img>
            <v-card-title> {{ room.title }}</v-card-title>
            <v-card-subtitle> {{ room.subtitle }} </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Explore </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    rooms: [
      {
        id: 1,
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        subtitle: 'Foster the People',
      },
      {
        id: 2,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 3,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'sdf Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 4,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'hgh Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 5,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Hajlkllcyon Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 6,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 7,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcsdfsdyon Days',
        subtitle: 'Ellie Goulding',
      },
      {
        id: 8,
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        subtitle: 'Ellie Goulding',
      },
    ],
  }),
}
</script>