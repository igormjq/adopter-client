<template>
  <section id="animalCreate" class="flex">
    <container class="flex-column align-center justify-center">
      <div class="wrapper">
        <card>
          <swiper :options="swiperOption" ref="createAnimalSwiper" slot="content" class="swiper__progress">
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Qual espécie do animal?</span>
              </div>
              <div class="step__options flex align-center">
                <div class="option --full flex flex-column justify-center align-center" :class="{ 'selected': create.type === 'DOG' }">
                  <div class="icon dog"></div>
                  <input value="DOG" type="radio" v-model="create.type">
                </div>
                <div class="option --full flex flex-column justify-center align-center" :class="{ 'selected': create.type === 'CAT' }">
                  <div class="icon cat"></div>
                  <input value="CAT" type="radio" v-model="create.type">
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <pre></pre>
                <transition name="fade">
                  <font-awesome-icon v-if="create.type" icon="chevron-right" size="2x" @click="goToStep(1)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Qual o nome do nosso amigo?</span>
              </div>
              <div class="step__options flex align-center justify-center">
                <input 
                  :class="{ 'active': create.name }" 
                  type="text" v-model="create.name"
                  placeholder="Nome"
                >
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.name" icon="chevron-right" size="2x" @click="goToStep(2)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="step-title flex justify-center">
                <span>Conte-nos um pouco mais sobre {{ create.name }}...</span>
              </div>
              <div class="step__options flex align-center justify-center">
                <label class="adopter-checkbox">Two
                  <input type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.name" icon="chevron-right" size="2x" @click="goToStep(3)" />
                </transition>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </card>
      </div>
    </container>
  </section>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import Card from '../../Card';
  export default {
    components: {
      Card,
    },
    data() {
      return {
        create: {
          type: '',
          name: '',
          size: '',
          gender: '',
          castrated: false,
          vaccinated: false,
          about: ''
        },
        step: 0,
        swiperOption: {
          allowTouchMove: false,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
          },
        }
      }
    },
    methods: {
      goToStep(num) {
        this.step = num;
        this.swiper.slideTo(this.step);
      }
    },
    computed: {
      swiper() {
        return this.$refs.createAnimalSwiper.swiper
      }
    },
    mounted() {
      this.swiper.slideTo(this.step);
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