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
              <div class="step__options flex flex-column align-center justify-center">
                <div class="step__options__group flex">
                  <input 
                    :class="{ 'active': create.name }" 
                    type="text" v-model="create.name "
                    placeholder="Nome"
                    @keyup.enter="() => create.name && goToStep(2)"
                  >
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.name" icon="chevron-right" size="2x" @click="goToStep(2)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex flex-column justify-center">
                <span>Onde vive {{ create.name }}?</span>
              </div>
              <div class="address-picker">
                <div class="address-info">
                    <multiselect
                      :class="['bottom-border', { 'selected' : temp.address.uf }]"
                      v-model="temp.address.uf" 
                      label="sigla"
                      placeholder="UF"
                      class="uf-select"
                      :options="locationService.uf.options"
                      :show-labels="false"
                      :searchable="true"
                      @select="create.address.city = ''"
                      @input="getCitiesByUf">
                      <template slot="noResult">Opção não encontrada</template>
                    </multiselect>
                    <multiselect
                      :class="['bottom-border', { 'selected' : create.address.city }]"
                      v-model="create.address.city"
                      placeholder="Cidade"
                      :options="locationService.city.options"
                      :show-labels="false"
                      :preselect-first="true">
                      <template slot="noOptions"><span>Escolha um estado</span></template>
                      <template slot="noResult"><span class="text-gray">Cidade não encontrada</span></template>
                    </multiselect>
                  </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.address.city" icon="chevron-right" size="2x" @click="goToStep(3)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Conte-nos um pouco sobre {{ create.name }}...</span>
              </div>
              <div class="step__options flex flex-column space-around">
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Sexo</span>
                  <div class="flex">
                    <adopter-radio value="MALE" v-model="create.gender">Macho</adopter-radio>
                    <adopter-radio value="FEMALE" v-model="create.gender">Fêmea</adopter-radio>
                  </div>
                </div>
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Porte</span>
                  <div class="flex">
                    <adopter-radio value="SMALL" v-model="create.size">
                      Pequeno
                    </adopter-radio>
                    <adopter-radio value="MEDIUM" v-model="create.size">
                      Médio
                    </adopter-radio>
                    <adopter-radio value="LARGE" v-model="create.size">
                      Grande
                    </adopter-radio>
                  </div>
                </div>
                <div class="step__options__group flex flex-column align-center">
                  <span class="label">Etapa de vida</span>
                  <div class="flex">
                    <adopter-radio value="PUPPY" v-model="create.ageGroup">
                      Filhote
                    </adopter-radio>
                    <adopter-radio value="ADULT" v-model="create.ageGroup">
                      Adult{{ parseWordToGender(create.gender)}}
                    </adopter-radio>
                    <adopter-radio value="ELDERLY" v-model="create.ageGroup">
                      Idos{{ parseWordToGender(create.gender)}}
                    </adopter-radio>
                  </div>
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.gender && create.size && create.ageGroup" icon="chevron-right" size="2x" @click="goToStep(4)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex justify-center">
                <span>Como está a saúde de {{ create.name }}?</span>
              </div>
              <div class="step__options flex align-center justify-center">
                <div class="step__options__group">
                  <div class="flex flex-wrap justify-center">
                    <adopter-checkbox v-model="create.vaccinated">
                      Vacinad{{ parseWordToGender(create.gender) }}
                    </adopter-checkbox>
                    <adopter-checkbox v-model="create.castrated">
                      Castrad{{ parseWordToGender(create.gender) }}
                    </adopter-checkbox>
                    <adopter-checkbox v-model="create.dewormed">
                      Desverminad{{ parseWordToGender(create.gender) }}
                    </adopter-checkbox>
                    <adopter-checkbox v-model="create.specialNeeds">
                      Possui necessidades especiais
                    </adopter-checkbox>
                  </div>
                </div>
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon icon="chevron-right" size="2x" @click="goToStep(5)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex flex-column justify-center">
                <span>Conte aos Adopters um pouco sobre {{ create.name }}</span>
                <div class="tip" v-if="create.specialNeeds">
                  <font-awesome-icon icon="star-of-life" size="xs" :style="{ 'color': '#EF3176' }"/>
                  <span>
                    Não esqueça de descrever as necessidades especiais!
                  </span>
                </div>
              </div>
              <div class="step__options flex align-center justify-center">
                <textarea 
                  :class="{ 'active': create.about }" 
                  type="text" v-model="create.about"
                  :placeholder="`${create.name}...`"
                  @keyup.enter="() => create.about && goToStep(6)" />
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon v-if="create.about" icon="chevron-right" size="2x" @click="goToStep(6)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex flex-column justify-center">
                <span>Agora vamos escolher uma foto bonita</span>
              </div>
              <div class="step__options flex align-center justify-center">
                <file-uploader @imageUploaded="setUploadedData" />
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon icon="chevron-right" size="2x" @click="goToStep(7)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex flex-column justify-center">
                <span>Ficou ótimo. Fique à vontade para escolher mais fotos!</span>
              </div>
              <div class="step__options flex justify-center">
                <file-uploader 
                  @imageUploaded="setUploadedData" 
                  :multiple="true"
                />
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <transition name="fade">
                  <font-awesome-icon icon="chevron-right" size="2x" @click="goToStep(8)" />
                </transition>
              </div>
            </swiper-slide>
            <swiper-slide class="step flex flex-column">
              <div class="step-title flex flex-column justify-center">
                <span>Estamos a um clique de ajudar. Confirme as informações!</span>
              </div>
              <div class="step__options flex justify-center">
                <div class="summary-card">
                  <div class="summary-card__details flex flex-column">
                    <div class="flex space-between">
                      <div>
                        <p class="name text-pink">{{ create.name }}</p>
                        <ul>
                          <li>Espécie: {{ animalType(create) }}</li>
                          <li>Sexo: {{ animalGender(create) }}</li>
                          <li>Etapa: {{ animalAgeGroup(create) }}</li>
                        </ul>
                      </div>
                      <div>
                        <font-awesome-icon class="inlist-icon text-pink" icon="map-marker-alt" />
                        <span>{{ create.address.city }} - {{ create.address.uf }}</span>
                      </div>
                      <div 
                        class="image-preview" 
                        :style="{ 'background-image': 'url(' + loadTemporaryProfileImage +')'}"/>
                    </div>
                    <div>
                      <ul>
                        <li
                          class="flex align-center"
                          v-for="{ displayName, iconName, iconPath, key } in animalInfo" 
                          :key="key"
                          v-if="create[key]">
                          <font-awesome-icon class="inlist-icon" v-if="iconName" :icon="iconName" :style="{ 'color': '#EF3176' }"/>
                          <img class="inlist-icon" :src="iconPath" v-else />
                          <span>{{ displayName(create.gender) }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="summary__about">
                      <p>
                        <font-awesome-icon class="text-pink" icon="quote-left" size="xs" />
                        {{ create.about }}
                        <font-awesome-icon icon="quote-right" class="text-pink" size="xs" />
                      </p>
                    </div>
                  </div>
                </div>       
              </div>
              <div class="step__options__actions flex space-between">
                <font-awesome-icon icon="chevron-left" size="2x" @click="goToStep(step - 1)" />
                <button class="btn pink" @click="showAdoptionWarning">Finalizar</button>
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
  import AddressMixins from '../../../mixins/AddressMixins.js';
  import Card from '../../Card';
  import FileUploader from '../../MultipleFileUploader.vue';
  import { UploadFile } from '../../../services/FirebaseService';

  export default {
    components: {
      Card,
      FileUploader
    },
    mixins: [AnimalMixins, AddressMixins],
    data() {
      return {
        create: {
          type: 'DOG',
          name: 'Fúlvio',
          size: 'MEDIUM',
          gender: 'MALE',
          ageGroup: 'ADULT',
          address: {
            uf: '',
            city: '',
          },
          profileImg: '',
          photos: [],
          castrated: true,
          vaccinated: true,
          dewormed: false,
          specialNeeds: false,
          about: 'Um cachorro bacana que encontrei no parque. Precisa de um lar.'.trim(),
        },
        temp: {
          profileImg: '',
          profileImgPreview: '',
          photos: [],
          address: {
            uf: '',
            city: ''
          }
        },
        step: 0,
        swiperOption: {
          allowTouchMove: false,
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
          },
        },
        swalOptions: {
          WARNING: {
            type: 'warning',
            title: 'Lembre-se',
            showCloseButton: true
          },
          CONFIRM: {
            type: 'confirm',
          }
        }
      }
    },
    methods: {
      goToStep(num) {
        this.step = num;
        this.swiper.slideTo(this.step);
      },
      setUploadedData(data) {
        if(!Array.isArray(data)) {
          this.temp.profileImg = data;
        } else {
          this.temp.photos = data;
        }
      },
      async sendToFirebase() {
        if(this.temp.profileImg) {
          this.create.profileImg = await UploadFile(this.temp.profileImg, 'animals');
        }
        if(this.temp.photos.length > 0) {
          this.create.photos = await Promise.all(
            this.temp.photos.map(photo => UploadFile(photo, 'animals'))
          );
        };
      },
      async showAdoptionWarning() {
        const action = await this.$swal({ 
          ...this.swalOptions.WARNING, 
          text: `Você é o responsável por ${this.create.name}`,
          confirmButtonColor: '#EF3176',
          confirmButtonText: 'Entendi. Posso terminar agora?',
        });

        if(action.dismiss) return;

        await this.submitAnimalCreate();
        
      },
      async submitAnimalCreate() {
        this.$store.dispatch('loadPage');

        await this.sendToFirebase();

        this.$store.dispatch('loadPage', false);
      }
    },
    computed: {
      ...mapState(['user']),
      swiper() {
        return this.$refs.createAnimalSwiper.swiper
      },
      loadTemporaryProfileImage() {
        const reader = new FileReader();
        reader.onload = () => this.temp.profileImgPreview = reader.result;

        if(this.temp.profileImg) {
          reader.readAsDataURL(this.temp.profileImg);
          return this.temp.profileImgPreview;
        }
      }
    },
    watch: {
      'temp.address.uf'({ sigla }) {
        this.create.address.uf = sigla;
      }
    },
    mounted() {
      this.swiper.slideTo(this.step);
    },
  }
</script>
<style lang="scss">
  #animalCreate {
    background-color: #eaebed;
    .wrapper {
      width: 35vw;
      height: 65vh;

      .card {
        height: 100%;
        border-radius: 0;
        &__content {
          height: 100%;
        }

        .adopter-check.checkbox {
          margin: 5px;
        }
      }
    }
    .address-picker {
      display: flex;
      align-items: center;
      height: 100%;
      .address-info {
        width: 100%;
        
        & > div {
          margin-bottom: 10px;
          &:first-child {
            width: 80px;
          }
        }
      }
    }
  }
</style>