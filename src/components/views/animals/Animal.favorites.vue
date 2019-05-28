<template>
  <list :animals="user.favoriteAnimals" />
</template>

<script>
import { mapGetters } from 'vuex'
import List from './Animal.list'
import Card from "../../Card.vue"

export default {
  components: {
    Card,
    List
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    console.log(this.$store.state);
  }
}
</script>
