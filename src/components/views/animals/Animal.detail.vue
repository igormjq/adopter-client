<template>
  <section id="animal">
    <container v-if="animal">
      <card>
        <div slot="content" class="animal-card">
          <div class="animal__info">
            <div class="animal__info__image">
              <div class="animal__avatar" :style="{ backgroundImage: `url(${animal.profileImg})` }" />
            </div>
            <div class="animal__info__content">
              <div class="animal__info__header flex space-between align-center">
                <h1 class="text-pink">{{ animal.name }}</h1>
                <div 
                  class="icon icon-favorite" 
                  :class="{ 'is-favorite': animalIsFavorite(animal.id) }"
                  @click="toggleFavoriteAnimal(animal)"/>
                </div>
              <div class="animal__info__details">
                <ul class="animal__info__details__general">
                  <li>Espécie: {{ animalType(animal) }} </li>
                  <li>Sexo: {{ animalGender(animal) }} </li>
                  <li>Idade: {{ animalAgeGroup(animal) }} </li>
                </ul>
                <ul class="animal__info__details__specific">
                  <li>Castrado</li>
                  <li>Vacinado</li>
                </ul>
              </div>
              <div class="animal__info__about">
                <p>{{ animal.about }}</p>
              </div>
            </div>
          </div>
          <div class="animal__actions">
            <div class="animal__actions__share flex flex-column justify-center">
              <div class="animal__actions__share__content">
                <p class="text-pink">Não pode adotar?</p>
                <span>Ajude {{ animal.name }} compartilhando nas redes sociais</span>
              </div>
              <social :networks="['facebook', 'instagram', 'twitter']" />
            </div>
            <div class="animal__actions__buttons flex flex-column">
              <button class="btn pink">Quero adotar</button>
              <button class="btn">Quer ser meu padrinho?</button>
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
      font-weight: 300;

      .animal {
        &__avatar {
          background-position: center;
          background-size: cover;
          height: 100%;
        }
        &__actions {
          @include grid(2, 30px);
          margin-top: 20px;
          
          &__share {
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
          &__buttons {
            .btn {
              font-size: 20px;
              font-weight: bolder;
              border-radius: 6px;
              height: 60px;
              font-weight: 800;

              &:first-child {
                margin-bottom: 10px;
              }
            }
          }
        }

        &__info {
          color: #6F6F6F;
          @include grid(2, 30px);
          
          &__header {
            position: relative;
            h1 {
              font-size: 36px;
              font-weight: bolder;
            }
            .icon-favorite {
              width: 45px;
              height: 45px;
            }
          }
          &__details {
            font-size: 12px;
            width: 70%;
            @include grid(2, 10px);

            ul {
              margin-top: 15px;
              li{
                margin: 10px 0;
              }
            }

            &__general, &__specific {
              &:before {
                font-size: 16px;
                color: #EF3176;
              }
            }
            &__specific {
              &:before {
                content: 'Outras características';
              }
            }

            &__general {
              &:before {
                content: 'Detalhes';
              }
            }
          }
          &__about {
            margin-top: 30px;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
