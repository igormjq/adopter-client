<template>
  <section id="animal">
    <container>
      <card class="--full">
        <div slot="content" class="animal-card">
          <div class="flex flex-column">
            <div class="animal__avatar" :style="{ backgroundImage: `url(${animal.profileImg})` }" />
            <div class="animal__share flex flex-column align-center">
              <div class="animal__share__content">
                <p>Não pode ajudar?</p>
                <span>Ajude {{ animal.name }} compartilhando nas redes sociais</span>
              </div>
              <social :networks="['facebook', 'instagram', 'twitter']" />
            </div>
          </div>
          <div class="flex flex-column">

          </div>
        </div>
      </card>
    </container>
  </section>
</template>

<script>
import { GET_ANIMAL } from '../../../graphql/queries'
import Card from "../../Card.vue";
import Social from '../../Social';
export default {
  components: {
    Card,
    Social
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
              color: #EF3176;
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
      }
      
    }
  }
</style>
