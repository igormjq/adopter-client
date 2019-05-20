<template>
  <div class="list flex">
    <card v-for="animal in animals" :key="animal.id">
      <div slot="thumbnail" :style='{ backgroundImage: "url(" + animal.profileImg + ")"}'>
        <div class="icon" :class="[animal.type.toLowerCase()]"></div>
      </div>
      <div slot="content" class="flex flex-column">
        <div class="animal__info">
          <div class="animal__info__name">
            <span>{{ animal.name }}</span>
          </div>
          <div class="animal__info__location">
            <span>{{ animal.address.city }} - {{ animal.address.uf }}</span>
          </div>
          <div class="animal__info__detail flex space-between align-center">
            <span>{{ animalAgeGroup(animal) }} - {{ animalGender(animal) }}</span>
            <div class="animal__info__detail__size flex --full">
              <div
                v-for="size in possibleSizes"
                :key="size"
                class="icon icon-paw"
                :class="{ [size]: animal.size.toLowerCase(), '--pink': animalSize(animal, size) }"
              />
            </div>
          </div>
        </div>
      </div>
    </card>
    <button class="btn btn-block" v-if="hasNextPage" @click=fetchMore>AEEEEE</button>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import Card from "../../Card.vue";
import { GET_ANIMALS } from "../../../graphql/queries.js";
import { TOGGLE_FAVORITE_ANIMAL } from '../../../graphql/mutations.js';

export default {
  components: {
    Card
  },
  data() {
    return {
      first: 20,
      skip: 0,
      hasNextPage: true,
      possibleSizes: ["small", "medium", "large"],
      title: "Seu mais novo amigo pode estar aqui"
    };
  },
  apollo: {
    animals: {
      query: GET_ANIMALS,
      variables: {
        first: 20,
        skip: this.skip
      }
    }
  },
  methods: {
    animalAgeGroup({ ageGroup }) {
      return ageGroup === 'ADULT' ? 'Adulto' : 'Filhote';
    },
    animalGender({ gender }) {
      return gender === 'MALE' ? 'Macho' : 'Fêmea';
    },
    animalSize({ size }, targetSize) {
      return size.toLowerCase() === targetSize;
    },
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
          right: 0px;
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

