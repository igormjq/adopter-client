<template>
  <section id="animal">
    <container v-if="animal" class="flex-column">
      <div class="back">
        <router-link to="/animals">
          <font-awesome-icon 
            class="icon-arrow-back"
            icon="arrow-left" 
            :style="{ 'color': '#EF3176' }" 
            size="2x"
          />
        </router-link>
      </div>
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
                  <li>Etapa: {{ animalAgeGroup(animal) }} </li>
                </ul>
                <ul class="animal__info__details__specific">
                  <li
                    class="flex align-center"
                    v-for="{ displayName, iconName, iconPath, key } in animalInfo" 
                    :key="key"
                    v-if="animal[key]">
                    <font-awesome-icon v-if="iconName" :icon="iconName" :style="{ 'color': '#EF3176' }"/>
                    <img :src="iconPath" v-else />
                    <span>{{ displayName(animal.gender) }}</span>
                  </li>
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
              <button class="btn pink" @click="sendAdoptionRequest">Quero adotar</button>
              <button class="btn">Quer ser meu padrinho?</button>
            </div>
          </div>
        </div>
      </card>
      <card>
        <div slot="content" class="communication-card">
          <div class="communication-card__input-container">
            <div class="title flex align-center">
              <img class="inlist-icon" src="../../../assets/img/icon/comment.svg">
              <span>Deixe um comentário</span>
            </div>
            <div class="wrapper flex flex-column">
              <textarea
                placeholder="Está com dúvidas? Deixe uma mensagem ao Adopter responsável"
                v-model="comment.text" rows="5">
              </textarea>
              <button class="btn pink" @click="sendMessage" @keyup.enter="sendMessage">Enviar</button>
            </div>
            <div class="chat-component">
              <div 
                class="chat-component__message flex align-center"
                :class="{ 'is-author': checkIsAuthor(author.id) }" 
                v-for="({ id, text, author }) in animal.comments" :key="id">
                <div 
                  class="chat-component__message__avatar" 
                  :style="{ backgroundImage: 'url(' + author.profileImg + ')' }" />
                <div class="chat-component__message__content flex flex-column">
                  <div class="chat-component__message__content__text">
                  <p>{{ text }}</p>
                </div>
                <div class="chat-component__message__content__footer flex space-between">
                  <span class="name">{{ author.name }}</span>
                  <span>Há 2 horas</span>
                </div>
                </div>
              </div>
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
import { CREATE_ADOPTION_REQUEST, COMMENT_ON_ANIMAL } from '../../../graphql/mutations';
import { CheckError } from '../../../services/ErrorHandlerService.js';
import AnimalMixins from '../../../mixins/AnimalMixins';
import Card from "../../Card.vue";
import Social from '../../Social';
import { AdoptionRequestTemplate } from '../../templates/AdoptionRequestTemplate'

export default {
  mixins: [AnimalMixins],
  components: {
    Card,
    Social
  },
  data() {
    return {
      comment: {
        text: ''
      },
      toastOptions: {
        duration: 3000,
        keepOnHover: true,
        className: 'adopter-toast',
        position: 'bottom-center',
      }
    }
  },
  methods: {
    async sendAdoptionRequest() {
      if(!this.user) {
        return this.$toasted.show('Entre na plataforma para solicitar adoções', this.toastOptions);
      }

      const { dismiss } = await this.$swal({
        html: AdoptionRequestTemplate(this.animal),
        confirmButtonColor: '#EF3176',
        confirmButtonText: 'Confirmar pedido de adoção',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Vou pensar um pouco melhor...'
      });

      if (dismiss) return;

      this.$store.dispatch('loadPage');

      try {
        const {
          data: {
            createAdoptionRequest: { id }
          }
        } = await this.$apollo.mutate({
          mutation: CREATE_ADOPTION_REQUEST,
          variables: {
            animalId: this.animal.id
          }
        });
        this.$store.dispatch('loadPage', false);

        await this.$swal({
          type: 'success',
          title: 'Muito obrigado!',
          text: `Seu pedido de adoção foi enviado com sucesso para ${this.animal.owner.name}!`
        });
      } catch (error) {
        this.$store.dispatch('loadPage', false);

        await this.$swal({
          type: 'warning',
          text: CheckError(error),
        });
      };
    },
    checkIsAuthor(id) {
      return this.animal.owner.id === id;
    },
    async sendMessage() {
      if(!this.user) {
        console.log('Não tem user');
      };

      try {
        const {
          data: {
            commentOnAnimal: { id }
          }
        } = await this.$apollo.mutate({
          mutation: COMMENT_ON_ANIMAL,
          variables: {
            animalId: this.animal.id,
            text: this.comment.text
          }
        });

        if(id) {
          this.comment.text = '';
          this.$apollo.queries.animal.refetch();
        }

      } catch (err) {
        console.log('deu ruim', err);
      }

    }
  },
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
    },
  }
}
</script>

<style lang="scss">
  @import '../../../assets/scss/mixins.scss';

  #animal {
    background-color: #eaebed;
    padding-bottom: 45px;

    & > .container {
      .card {
        margin-top: 15px;
        padding: 35px;
        font-weight: 300;
      }
    }

    .back {
      margin-top: 15px;

      .icon-arrow-back {
        cursor: pointer;
      }

    }
    .animal-card {
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
          min-height: 40vh;
          @include grid(2, 30px);

          &__header {
            position: relative;
            h1 {
              font-size: 36px;
              font-weight: 800;
            }
            .icon-favorite {
              width: 45px;
              height: 45px;
            }
          }
          &__details {
            font-size: 14px;
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
              li {
                img {
                  width: 1rem;
                }
                span {
                  margin-left: 5px;
                }
              }
            }

            &__general {
              &:before {
                content: 'Detalhes';
              }
            }
          }
          &__about {
            margin-top: 15px;
            line-height: 20px;
            max-height: 200px;
            overflow-y: scroll;
          }
        }
      }
    }
    .communication-card {
      &__input-container {
        .title {
          color: #EF3176;
          margin-bottom: 10px;
          font-size: 18px;

          .inlist-icon {
            width: 1.8rem;
          }
        }
        .wrapper {
          textarea {
            outline: none;
            font-size: 16px;
            padding: 15px;
            font-weight: 300;
            padding-bottom: 10px;
            transition: border .4s;
            border-radius: 6px;
            border: 1px solid #6F6F6F;
            resize: none;
            width: 100%;
            &:focus, &.active {
              border-color: #EF3176;
            }
          }
          .btn {
            align-self: flex-end;
            margin-top: 10px;
            height: 40px;
            width: 100px;
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
