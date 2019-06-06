<template>
  <section id="animal">
    <container>
      <h2>Oi, meu nome é {{ animal.name }}</h2>
    </container>
  </section>
</template>

<script>
import { GET_ANIMAL } from '../../../graphql/queries'
export default {
  apollo: {
    animal: {
      query: GET_ANIMAL,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style>

</style>
