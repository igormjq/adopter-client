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
      padding: 5px;
      width: 235px;
      margin: 0 20px 20px 0;

      &__thumbnail {
        position: relative;
        
        .icon {
          width: 29px;
          height: 29px;
          position: absolute;
          bottom: -3px;
          right: -3px;
          border-radius: 4px;
          background-color:#FFF;
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
        }      
      }

      .animal__info {
        &__name {
          color: #EF3176;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 0;
        }
        &__location {
          color: #6F6F6F;
          font-size: 12px;
          font-weight: lighter;
        }
      }
    }
  }
</style>
