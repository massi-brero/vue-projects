 const { createApp, ref } = Vue;
    const App = {
      setup() {
        // Keep track of the list of photos
        const photos = ref([])
        const newPhotoUrl = ref('')
        // We need a ref for the currently entered URL
        const addPhoto = () => {
          const newPHoto = {
            id: photos.value.length + 1,
            url: newPhotoUrl.value,
            isFavorite: false
          }
          if(newPhotoUrl !== '') {
            photos.value.push(newPHoto)
            newPhotoUrl.value = ''
          }
        };
        const toggleFavorite = () => {
          // Favorite toggling logic
        };

        return {
            photos,
            newPhotoUrl,
            addPhoto
        }
      },
    };
    createApp(App).mount('#app');