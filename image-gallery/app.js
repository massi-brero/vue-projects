const { createApp, ref } = Vue
const defaultPhotos = [
  {
    id: 1,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlb2X5hrkFKr4MqYp1DZ5U3PtjBjDq2RtjHQ&s',
    isFavorite: false,
  },
  {
    id: 2,
    url: 'https://source.roboflow.com/HgDWeStV0dN5bhUFsCaPnMvGoE13/2LGyealNipbD4rgLCwCk/original.jpg',
    isFavorite: false,
  },
  {
    id: 3,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkAnZDBbCPF8L2d-gxWWP99GLDv-rMfvOGg&s',
    isFavorite: false,
  },
]
const App = {
  setup() {
    // Keep track of the list of photos
    const photos = ref(defaultPhotos)
    const newPhotoUrl = ref('')
    // We need a ref for the currently entered URL
    const addPhoto = () => {
      const newPHoto = {
        id: photos.value.length + 1,
        url: newPhotoUrl.value,
        isFavorite: false,
      }
      if (newPhotoUrl !== '') {
        photos.value.push(newPHoto)
        newPhotoUrl.value = ''
      }
    }
    const toggleFavorite = (photo) => {
      photo.isFavorite = !photo.isFavorite
    }

    return {
      photos,
      newPhotoUrl,
      addPhoto,
      toggleFavorite
    }
  },
}
createApp(App).mount('#app')
