<template>
  <section id="animalsList">
    <container class="container">
      <transition-group name="fade" tag="div" class="list">
        <card v-for="animal in animals" :key="animal.id">
          <div slot="thumbnail" :style='{ backgroundImage: "url(" + animal.profileImg + ")"}'>
            <div class="icon icon-favorite" />
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
                <button @click="toggleFavoriteAnimal(animal)">gostei desse carinha</button>
              </div>
            </div>
          </div>
          
        </card>
      </transition-group>
    </container>
    <button class="btn pink btn-block" v-if="hasNextPage" @click="$emit('fetchMore')">VEJA MAIS AMIGOS</button>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Card from "../../Card.vue";
import { GET_ANIMALS } from "../../../graphql/queries.js";
import { TOGGLE_FAVORITE_ANIMAL } from '../../../graphql/mutations.js';

export default {
  components: {
    Card
  },
  props: ['animals', 'hasNextPage'],
  data() {
    return {
      first: 20,
      skip: 0,
      possibleSizes: ["small", "medium", "large"],
      toastOptions: {
        duration: 3000,
        keepOnHover: true,
        className: 'adopter-toast'
      }
    };
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
    async toggleFavoriteAnimal(animal) {

      if(!this.user) 
        return this.$toasted.show('Faça login para curtir a bicharada :)', this.toastOptions);

      try {
        const { 
          data: { 
            toggleFavoriteAnimal: { operation, message, success }
          }
        } = await this.$apollo.mutate({
          mutation: TOGGLE_FAVORITE_ANIMAL,
          variables: {
            animalId: animal.id
          }
        });

        if(success) {
          this.$store.dispatch(operation, animal);
          this.$toasted.show(`${animal.name} ${message}`, this.toastOptions);
        }


      } catch (e) {
        alert(e);
      }
    },
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
};
</script>
<style lang="scss">
#animalsList {
  background-color: #eaebed;

  .btn {
    padding: 15px 0;
  }
}
.list {
  width: 100%;
  margin: 25px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .card {

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
      cursor: pointer;

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

