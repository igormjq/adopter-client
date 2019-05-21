import Home from '../components/views/home/Home.index.vue'
import Animals from '../components/views/animals/Animal.index.vue'
import Favorites from '../components/views/animals/Animal.favorites.vue'

export default [
  { path: '/', component: Home },
  { path: '/animals', component: Animals },
  { path: '/favorites', component: Favorites }
]