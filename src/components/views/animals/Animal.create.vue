<template>
  <section id="animalCreate">
    <container class="flex-column">
      <h2>Cadastrar novo amigo</h2>
        <swiper :options="swiperOption">
          <swiper-slide>
            <card>
              <div slot='content'>
                <h1>aheuaseua</h1>
              </div>
            </card>
          </swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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

</style>