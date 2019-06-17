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
                  @keyup.enter="() => create.name && goToStep(2)">
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.name" icon="chevron-right" size="2x" @click="goToStep(2)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Conte-nos um pouco sobre {{ create.name }}...</span>
              </div>
              <div class="step__options flex flex-column space-around">
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Gênero</span>
                  <div class="flex">
                    <adopter-radio value="MALE" v-model="create.gender">Macho</adopter-radio>
                    <adopter-radio value="FEMALE" v-model="create.gender">Fêmea</adopter-radio>
                  </div>
                </div>
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Porte</span>
                  <div class="flex">
                    <adopter-radio value="SMALL" v-model="create.size">Pequeno</adopter-radio>
                    <adopter-radio value="MEDIUM" v-model="create.size">Médio</adopter-radio>
                    <adopter-radio value="LARGE" v-model="create.size">Grande</adopter-radio>
                  </div>
                </div>
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Etapa de vida</span>
                  <div class="flex">
                    <adopter-radio value="PUPPY" v-model="create.ageGroup">Filhote</adopter-radio>
                    <adopter-radio value="ADULT" v-model="create.ageGroup">Adulto</adopter-radio>
                  </div>
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.gender && create.size && create.ageGroup" icon="chevron-right" size="2x" @click="goToStep(3)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Como está a saúde de {{ create.name }}?</span>
              </div>
              <div class="step__options flex align-center justify-center">
                <div class="step__options__group">
                  <div class="flex">
                    <adopter-checkbox v-model="create.vaccinated">
                      Vacinad{{ parseWordToGender(create.gender) }}
                    </adopter-checkbox>
                    <adopter-checkbox v-model="create.castrated">
                      Castrad{{ parseWordToGender(create.gender) }}
                    </adopter-checkbox>
                  </div>
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon icon="chevron-right" size="2x" @click="goToStep(4)" />
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
  import AnimalMixins from '../../../mixins/AnimalMixins';
  import Card from '../../Card';
  export default {
    components: {
      Card,
    },
    mixins: [AnimalMixins],
    data() {
      return {
        create: {
          type: '',
          name: '',
          size: '',
          gender: '',
          ageGroup: '',
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
      },
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