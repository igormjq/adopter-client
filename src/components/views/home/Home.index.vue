<template>
  <section id="header" class="flex --full">
    <div class="content flex --full">
      <container class="align-center justify-center">
        <div class="home__form__wrapper">
          <div class="home__form__wrapper__image">
            <img class="img-responsive" src="../../../assets/img/dog-and-cat-form.png">
          </div>
          <card-component :width="450" :height="450">
            <h1 slot="title">Encontrar um amigo</h1>
            <h2 slot="subtitle">Descubra amigos perto de você</h2>
            <home-form slot="content" />
          </card-component>
        </div>
      </container>
    </div>
    <div class="banner flex --full">
    </div>
  </section>
</template>

<script>
import CardComponent from '../../Card'
import HomeForm from './HomeForm'

export default {
  components: {
    'card-component': CardComponent,
    'home-form': HomeForm
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  #header {
    height: 100vh;
    padding-top: 70px;

    div {
      &.content {
        padding-top: 70px;

        .home__form__wrapper {
          position: relative;

          &__image {
            position: absolute;
            top: -88px;
            width: 220px;
            left: 50%;
            transform: translate(-50%, -5px);
          }
        }
      }
      &.banner {
        background-image: url(../../../assets/img/pages/home/bg-header.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position-y: 30%;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          background: rgba(239, 49, 118, 0.4);
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
