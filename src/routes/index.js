import Home from '../components/views/home/Home.index.vue'
import Animals from '../components/views/animals/Animal.index.vue'
import AnimalDetail from '../components/views/animals/Animal.detail.vue';
import Favorites from '../components/views/animals/Animal.favorites.vue'

export default [
  { path: '/', component: Home },
  { path: '/animals', component: Animals },
  { path: '/animals/:id', component: AnimalDetail },
  { path: '/favorites', component: Favorites }
]