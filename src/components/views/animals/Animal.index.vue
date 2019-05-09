<template>
  <section>
    <container class="flex-column">
      <h1>{{ title }}</h1>
      <div class="list flex">
        <card v-for="animal in animals" :key="animal.id">
          <div 
            slot="thumbnail" 
            :style='{ backgroundImage: "url(" + animal.profileImg + ")"}'
          >
          <div class="icon" :class="[animal.type.toLowerCase()]">
          </div>
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
                    v-for="size in possibleSizes" :key="size"
                    class="icon icon-paw"
                    :class="{ [size]: animal.size.toLowerCase(), '--pink': checkAnimalSize(animal, size) }"
                  />
                </div>
              </div>
            </div>
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
      possibleSizes: ['small', 'medium', 'large'],
      title: 'Seu mais novo amigo pode estar aqui'
    }
  },
  apollo: {
    animals: {
      query: GET_ANIMALS,
      fetchPolicy: 'cache-and-network'
    }
  },
  methods: {
    animalGender({ gender }) {
      return gender === 'MALE' ? 'Macho' : 'Fêmea';
    },
    animalAgeGroup({ ageGroup }) {
      return ageGroup === 'ADULT' ? 'Adulto' : 'Filhote';
    },
    checkAnimalSize({ size }, targetSize) {
      return size.toLowerCase() === targetSize;
    }
  }
}
</script>

<style lang="scss">
  .list {
    flex-wrap: wrap;
    margin-top: 25px;

    .card {
      width: 235px;
      margin: 0 20px 20px 0;

      &__thumbnail {
        position: relative;
        padding: 5px;
        
        .icon {
          width: 24px;
          height: 24px;
          position: absolute;
          bottom: 3px;
          right: 3px;
          border-radius: 4px 0px 0px 0px;
          background-color:#FFF;
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
        }      
      }

      .animal__info {
        padding: 10px 5px;

        & > * {
          padding-bottom: 10px;
          color: #6F6F6F;
          font-size: 12px;
          font-weight: lighter;
        }
        &__name {
          color: #EF3176;
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
