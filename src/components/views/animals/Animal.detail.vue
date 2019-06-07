<template>
  <section id="animal">
    <container v-if="animal">
      <card>
        <div slot="content" class="animal-card">
          <div class="flex flex-column">
            <div class="animal__avatar" :style="{ backgroundImage: `url(${animal.profileImg})` }" />
            <div class="animal__share flex flex-column align-center">
              <div class="animal__share__content">
                <p class="text-pink">Não pode adotar?</p>
                <span>Ajude {{ animal.name }} compartilhando nas redes sociais</span>
              </div>
              <social :networks="['facebook', 'instagram', 'twitter']" />
            </div>
          </div>
          <div class="animal__info flex flex-column">
            <div class="animal__info__header flex space-between align-center">
              <h1 class="text-pink">{{ animal.name }}</h1>
              <div 
                class="icon icon-favorite" 
                :class="{ 'is-favorite': animalIsFavorite(animal.id) }"
                @click="toggleFavoriteAnimal(animal)"
              />
            </div>
            <div class="animal__info__details">
              <ul>
                <li>Espécie: {{ animalType(animal) }} </li>
                <li>Sexo: {{ animalGender(animal) }} </li>
                <li>Idade: {{ animalAgeGroup(animal) }} </li>
              </ul>
            </div>
            <div class="animal__info__about">
              <p>{{ animal.about }}</p>
            </div>
          </div>
        </div>
      </card>
    </container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_ANIMAL } from '../../../graphql/queries';
import AnimalMixins from '../../../mixins/AnimalMixins';
import Card from "../../Card.vue";
import Social from '../../Social';

export default {
  mixins: [AnimalMixins],
  components: {
    Card,
    Social
  },
  data() {
    return {
      toastOptions: {
        duration: 3000,
        keepOnHover: true,
        className: 'adopter-toast',
        position: 'bottom-center',
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  apollo: {
    animal: {
      query: GET_ANIMAL,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/mixins.scss';

  #animal {
    background-color: #eaebed;
    .card {
      margin-top: 40px;
    }
    .animal-card {
      padding: 45px;
      display: grid;
      grid-template-columns: .7fr 1fr;
      grid-column-gap: 40px;

      .animal {
        &__avatar {
          background-position: center;
          background-size: cover;
          height: 20em;
        }
        &__share {
          margin-top: 10px;
          &__content {
            text-align: center;
            & > p {
              font-size: 24px;
            }
            & > span {
              font-size: 12px;
              color: #6F6F6F;
            }
          }
          .social {
            justify-content: center;
            margin-top: 15px;
            .icon-social {
              width: 35px;
              height: 35px;
            }
          }
        }
        &__info {
          color: #6F6F6F;

          &__header {
            position: relative;
            h1 {
              font-size: 32px;
              font-weight: 600;
            }
            .icon-favorite {
              width: 45px;
              height: 45px;
            }
          }
          &__details {
            font-size: 14px;

            ul {
              margin-top: 15px;
              li:not(:first-child):not(:last-child) {
                margin: 10px 0;
              }
            }
          }
          &__about {
            margin-top: 30px;
          }
        }
      }
      
    }
  }
</style>
