<template>
  <section id="header" class="flex --full">
    <div class="content flex --full">
      <container class="align-center justify-center">
        <div class="home__form__wrapper">
          <div class="home__form__wrapper__image">
            <img src="../assets/img/dog-and-cat-form.png">
          </div>
          <card-component :width="400" :height="400">
          </card-component>
        </div>
      </container>
    </div>
    <div class="banner flex --full">
    </div>
  </section>
</template>

<script>
import CardComponent from './Card'

export default {
  components: {
    'card-component': CardComponent
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

            img {
              width: 100%;
            }
          }
        }
      }
      &.banner {
        background-image: url(../assets/img/pages/home/bg-header.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position-y: 30%;
      }
    }
  }
</style>
