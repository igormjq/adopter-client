<template>
  <div>
    <list
      v-if="hasResults"
      :animals="$data.animals"
      @fetchMore="fetchMore">
    </list>
    <div class="no-result flex align-center justify-center" v-else>
      <div class="no-result__wrapper flex flex-column align-center">
        <font-awesome-layers class="no-result__icon fa-8x" :style="{ color: '#9D9D9D' }">
          <font-awesome-icon icon="search"></font-awesome-icon>
          <font-awesome-icon icon="dog" transform="shrink-11 left-2 up-2"></font-awesome-icon>
        </font-awesome-layers>
        <div class="no-result__message">
          <h2>Que pena! Não há animais cadastrados próximos</h2>
          <h3>Que tal começar cadastrando um?</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      title: "Seu mais novo amigo pode estar aqui",
      hasResults: null,
    };
  },
  methods: {
    ...mapActions([
      'checkNextPage',
      'loadPage'
    ]),
    async fetchMore() {
      this.skip = this.skip + this.first;
  
      this.$apollo.queries.animals.fetchMore({
        variables: {
          first: this.first,
          skip: this.skip,
          where: this.search
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const moreAnimals = fetchMoreResult.animals;

          this.checkNextPage(moreAnimals);

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
      },
      fetchPolicy: 'network-only',
      result({ data }) {
        this.hasResults = data.animals.length > 0;
        this.checkNextPage(data.animals);
        this.loadPage(false);
      }
    });
  },
  updated() {
    if(this.$data.animals) {
      this.checkNextPage(this.$data.animals);
    }
  }
};
</script>
<style lang="scss">
  .no-result {
    height: 100vh;

    &__icon {
      margin-bottom: 10px;
    }

    &__message {
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      color: #9D9D9D;
    }
  }
</style>
