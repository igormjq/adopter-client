<template>
  <list :animals="user.favoriteAnimals" />
</template>

<script>
import { mapState } from 'vuex'
import List from './Animal.list'
import Card from "../../Card.vue"

export default {
  components: {
    Card,
    List
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
}
</script>
