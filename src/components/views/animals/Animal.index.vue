<template>
  <section id="animalsList">
    <container class="flex-column">
      <list :query="query"></list>
    </container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
      query: GET_ANIMALS,
      first: 20,
      skip: 0,
      hasNextPage: true,
      possibleSizes: ["small", "medium", "large"],
      title: "Seu mais novo amigo pode estar aqui"
    };
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
  },
  methods: {
    async fetchMore() {
      this.skip = this.skip + this.first;
    }
  }
};
</script>

<style lang="scss">
#animalsList {
  background-color: #eaebed;
}
.list {
  flex-wrap: wrap;
  margin-bottom: 25px;

  .card {
    width: 235px;
    margin: 0 20px 20px 0;
    .icon-favorite {
      right: -5px;
      opacity: 0;
      transition: .5s ease-in-out;
      &.is-favorite {
        &:before {
          animation: like .6s ease-in-out;
          background-image: url(../../../assets/img/icon/011-like-full.svg);
        }
      }
    }
    &:hover {
      .icon-favorite{ 
        right: 10px;
        opacity: 1;
      }
    }
    &__thumbnail {
      position: relative;
      padding: 5px;

      .icon {
        position: absolute;

        &.dog,
        &.cat {
          width: 24px;
          height: 24px;
          position: absolute;
          bottom: 3px;
          right: 3px;
          border-radius: 4px 0px 0px 0px;
          background-color: #fff;
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }

    .animal__info {
      padding: 10px 5px;

      & > * {
        padding-bottom: 10px;
        color: #6f6f6f;
        font-size: 12px;
        font-weight: lighter;
      }
      &__name {
        color: #ef3176;
        font-weight: 700;
        font-size: 14px;
      }

      &__detail__size {
        justify-content: flex-end;
        align-items: flex-end;
        position: relative;

        &:before {
          content: 'Porte';
          font-size: 10px;
          position: absolute;
          top: -15px;
        }

        .icon {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
