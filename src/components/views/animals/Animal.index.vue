<template>
  <section>
    <h1>Animais avenida</h1>
  </section>
</template>

<script>
import { ANIMALS_LIST } from '../../../graphql/query.js'
export default {
  data() {
    return {
      animals: []
    }
  },
  apollo: {
    animals: {
      query: ANIMALS_LIST,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>

<style>

</style>
