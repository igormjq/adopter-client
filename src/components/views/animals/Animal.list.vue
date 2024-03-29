<template>
  <section id="animalsList">
    <container class="container">
      <transition-group name="fade" tag="div" class="list" v-if="animals">
        <card v-for="animal in animals" :key="animal.id">
          <div 
            class="thumbnail__image" 
            slot="thumbnail" 
            :style='{ backgroundImage: "url(" + animal.profileImg + ")"}'
            @click.stop="goTo(animal.id)"
          >
            <div 
              class="icon icon-favorite" 
              :class="{ 'is-favorite': animalIsFavorite(animal.id) }"
              @click.stop="toggleFavoriteAnimal(animal)" />
            <div class="icon" :class="[animal.type.toLowerCase()]"></div>
            <font-awesome-icon 
              icon="paw" 
              :style="{ color: '#FFF' }"
              class="thumbnail__image__hover"
              size="3x"
            />
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
      </transition-group>
    </container>
    <container class="justify-center">
      <button class="btn pink btn-see-more" v-if="hasNextPage" @click="$emit('fetchMore')">VEJA MAIS AMIGOS</button>
    </container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AnimalMixins from '../../../mixins/AnimalMixins'
import Card from "../../Card.vue"

export default {
  mixins: [AnimalMixins],
  components: {
    Card
  },
  props: {
    animals: Array,
  },
  data() {
    return {
      first: 20,
      skip: 0,
      possibleSizes: ["small", "medium", "large"],
      toastOptions: {
        duration: 3000,
        keepOnHover: true,
        className: 'adopter-toast',
        position: 'bottom-center',
      }
    };
  },
  methods: {
    goTo(id) {
      this.$router.push(`animals/${id}`);
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'hasNextPage',
    ]),
  },
};
</script>
<style lang="scss">
@import '../../../assets/scss/mixins.scss';
#animalsList {
  background-color: #eaebed;
}
.list {
  width: 100%;
  margin: 25px 0;
  display: grid;
  @include grid(5, 20px);
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
      // padding: 5px;
      cursor: pointer;

      .thumbnail__image {
        &:before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity .5s;
          border-radius: 6px 6px 0 0;
          background-color: rgba(239, 49, 118, 0.79)
        }
        &__hover {
          opacity: 0;
          transition: opacity .6s;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &:hover {
        .thumbnail__image {
          &:before {
            opacity: 1;
          }
          &__hover {
            display: block;
            opacity: 1;
          }
        }
      }

      .icon {
        position: absolute;

        &.dog,
        &.cat {
          width: 24px;
          height: 24px;
          position: absolute;
          bottom: 0px;
          right: 0px;
          border-radius: 4px 0px 0px 0px;
          background-color: #fff;
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
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

        .icon:nth-child(2) {
          margin: 0 5px;
        }

        &:before {
          content: 'Porte';
          font-size: 10px;
          position: absolute;
          top: -15px;
        }
      }
    }
  }
}
</style>

