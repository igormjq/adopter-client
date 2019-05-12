<template>
  <section>
    <container class="flex-column">
      <h1>{{ title }}</h1>
      <div >
        <transition-group  name="fade" tag="div" class="list flex justify-center">
          <card v-for="animal in animals" :key="animal.id">
            <div slot="thumbnail" :style='{ backgroundImage: "url(" + animal.profileImg + ")"}'>
              <div class="icon" :class="[animal.type.toLowerCase()]"></div>
              <div class="icon icon-favorite" @click="$event.target.classList.add('is-favorite')" :class="{ 'is-favorite': Math.random() > 0.5 }"></div>
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
                      :class="{ [size]: animal.size.toLowerCase(), '--pink': checkAnimalSize(animal, size) }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </card>
        </transition-group>
      </div>
    </container>
    <button-component v-if="hasNextPage" class="btn-see-more pink" :onClick="fetchMoreAnimals" :height="50">
      <span>VEJA MAIS AMIGOS</span>
    </button-component>
  </section>
</template>

<script>
import Card from "../../Card.vue";
import { GET_ANIMALS } from "../../../graphql/queries.js";
export default {
  components: {
    Card
  },
  data() {
    return {
      animals: [],
      first: 20,
      skip: 0,
      hasNextPage: true,
      possibleSizes: ["small", "medium", "large"],
      title: "Seu mais novo amigo pode estar aqui"
    };
  },
  methods: {
    animalGender({ gender }) {
      return gender === "MALE" ? "Macho" : "Fêmea";
    },
    animalAgeGroup({ ageGroup }) {
      return ageGroup === "ADULT" ? "Adulto" : "Filhote";
    },
    checkAnimalSize({ size }, targetSize) {
      return size.toLowerCase() === targetSize;
    },
    async fetchMoreAnimals() {
      this.skip = this.first + this.skip;

      const {
        data: { animals }
      } = await this.$apollo.query({
        query: GET_ANIMALS,
        variables: {
          first: this.first,
          skip: this.skip
        }
      });

      this.checkNextPage(animals);
      this.animals = this.animals.concat(animals);
    },
    checkNextPage(animals) {
      console.log(animals.length);
      this.hasNextPage = animals.length >= this.first;
    }
  },
  async mounted() {
    const { 
      data: { animals } 
    } = await this.$apollo.query({
      query: GET_ANIMALS,
      variables: {
        first: this.first,
        skip: this.skip
      }
    });

    this.checkNextPage(animals);
    this.animals = animals;
  }
};
</script>

<style lang="scss">
.list {
  flex-wrap: wrap;
  margin-top: 25px;
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

        .icon {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.container {
  background-color: #eaebed;
}
</style>
