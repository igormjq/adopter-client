<template>
  <section>
    <container class="flex-column">
      <h1>{{ title }}</h1>
      <div class="list flex">
        <card v-for="animal in animals" :key="animal.id">
          <div slot="content">
            {{ animal.name }}
            {{ animal.gender }}
            {{ animal.size }}
          </div>
        </card>
      </div>
    </container>
  </section>
</template>

<script>
import Card from '../../Card.vue'
import { GET_ANIMALS } from '../../../graphql/queries.js'
export default {
  components: {
    Card
  },
  data() {
    return {
      animals: [],
      title: 'Seu mais novo amigo pode estar aqui'
    }
  },
  apollo: {
    animals: {
      query: GET_ANIMALS,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>

<style lang="scss">
  .list {
    flex-wrap: wrap;
    margin-top: 25px;

    .card {
      padding: 15px;
      width: 235px;
      margin-right: 10px;
    }
  }
</style>
