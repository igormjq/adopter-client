<template>
  <list :animals="$data.animals" :hasNextPage= "$data.animals.length >= 20" @fetchMore="fetchMore"></list>
</template>

<script>
import { mapState } from 'vuex';
import Card from "../../Card.vue";
import { GET_ANIMALS } from "../../../graphql/queries.js";
import { TOGGLE_FAVORITE_ANIMAL } from '../../../graphql/mutations.js';
import List from './Animal.list';

export default {
  components: {
    Card,
    List
  },
  data() {
    return {
      first: 20,
      skip: 0,
      hasNextPage: null,
      possibleSizes: ["small", "medium", "large"],
      title: "Seu mais novo amigo pode estar aqui"
    };
  },
  methods: {
    async fetchMore() {
      this.skip = this.skip + this.first;

      this.$apollo.queries.animals.fetchMore({
        variables: {
          first: this.first,
          skip: this.skip,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const moreAnimals = fetchMoreResult.animals;

          this.hasNextPage = moreAnimals.length >= 20;

          return {
            animals: [...previousResult.animals, ...moreAnimals]
          }
        }
      })
    },
  },
  computed: {
    ...mapState({
      search: state => state.animal.search
    })
  },
  created() {
    this.$apollo.addSmartQuery('animals', {
      query: GET_ANIMALS,
      variables: {
        first: 20,
        skip: this.skip,
        where: this.search
      }
    });
  }
};
</script>
