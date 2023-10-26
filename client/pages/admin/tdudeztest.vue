<template>
    <v-app>
      <v-autocomplete
        v-model="selectedItem"
        :items="items"
        item-text="text"
        item-value="value"
        label="Select an item"
        @change="onSelect"
      >
        <template v-slot:item="{ item }">
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://medias.thansettakij.com/uploads/images/contents/w1024/2022/08/L0JfCJZSmVLqdI4elGIO.webp" alt="Item Image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedItem: null,
        items: [
          { text: 'Item 1', value: 1, picture: 'https://www.purina.co.th/sites/default/files/styles/ttt_image_510/public/2021-02/BREED%20Hero%20Mobile_0051_pomeranian.jpg' },
          { text: 'Item 2', value: 2, picture: 'https://medias.thansettakij.com/uploads/images/contents/w1024/2022/08/L0JfCJZSmVLqdI4elGIO.webp' },
          // Add more items with text and picture
        ],
      };
    },
    methods: {
      onSelect() {
        // Handle the selected item
        console.log('Selected item:', this.selectedItem);
      },
    },
  };
</script>