<template>
  <section id="animal">
    <container>
      <h1>EU SOU {{ animal.name }}</h1>
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
