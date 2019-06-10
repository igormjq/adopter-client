<template>
  <section id="animalCreate" class="flex">
    <container class="flex-column align-center justify-center">
      <div class="wrapper">
        <card>
          <swiper :options="swiperOption" slot="content" class="swiper__progress">
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Qual espécie do animal?</span>
              </div>
              <div class="step__options flex align-center">
                <div class="option --full flex flex-column justify-center align-center">
                  <div class="icon dog"></div>
                  <h2>Cão</h2>
                </div>
                <div class="option --full flex flex-column justify-center align-center">
                  <div class="icon cat"></div>
                  <h2>Gato</h2>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </card>
      </div>
    </container>
  </section>
</template>
<script>
  import Card from '../../Card';
  export default {
    components: {
      Card,
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
          },
        }
      }
    }
  }
</script>
<style lang="scss">
  #animalCreate {
    background-color: #eaebed;
    .wrapper {
      width: 35vw;
      height: 50vh;

      .card {
        height: 100%;
        border-radius: 0;
        &__content {
          height: 100%;
        }
      }
    }
  }
</style>