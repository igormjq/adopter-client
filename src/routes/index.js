import Home from '../components/views/home/Home.index.vue'
import AnimalHome from '../components/views/animals/Animal.vue';
import Animals from '../components/views/animals/Animal.index.vue'
import AnimalDetail from '../components/views/animals/Animal.detail.vue';
import AnimalCreate from '../components/views/animals/Animal.create.vue';
import Favorites from '../components/views/animals/Animal.favorites.vue'

export default [
  { path: '/', component: Home },
  { path: '/animals', component: AnimalHome, children: [
      { path: '', component: Animals },
      { path: 'new', component: AnimalCreate },
      { path: ':id', component: AnimalDetail },
    ]
  },
  { path: '/favorites', component: Favorites }
]