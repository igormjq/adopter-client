<template>
  <form class="form home__form flex flex-column align-center justify-center" @submit.prevent="fetchAnimalsByFilter">
    <div class="form__body">
      <div class="address flex">
        <multiselect
          :class="{ 'selected' : uf.selected }"
          v-model="uf.selected" 
          label="sigla"
          placeholder="UF"
          class="uf-select"
          :options="uf.options"
          :show-labels="false"
          :searchable="true"
          @select="resetCities"
          @input="fetchCities"
        >
          <template slot="noResult">Opção não encontrada</template>
        </multiselect>
        <multiselect
          :class="{ 'selected' : city.selected }"
          v-model="city.selected"
          placeholder="Cidade"
          :options="city.options"
          :show-labels="false"
          :preselect-first="true"
          @input="updateSearchFilterCity"
        >
        <template slot="noOptions"><span>Escolha um estado</span></template>
        <template slot="noResult"><span class="text-gray">Cidade não encontrada</span></template>
        </multiselect>
      </div>
      <multiselect
        :class="{ 'selected' : type.selected.length > 0 }"
        v-model="type.selected"
        placeholder="Tipo"
        label="name"
        track-by="value"
        :multiple="true"
        :options="type.options"
        :show-labels="false"
        :taggable="true"
        :searchable="false"
        @input="updateSearchType">
      </multiselect>
      <multiselect
        :class="{ 'selected' : size.selected.length > 0 }"
        v-model="size.selected"
        placeholder="Porte"
        label="name"
        track-by="value"
        :multiple="true"
        :options="size.options"
        :show-labels="false"
        :searchable="false"
        @input="updateSearchSize">
      </multiselect>
      <multiselect
        :class="{ 'selected' : gender.selected.length > 0 }"
        v-model="gender.selected"
        placeholder="Sexo"
        label="name"
        track-by="value"
        :multiple="true"
        :options="gender.options"
        :show-labels="false"
        :searchable="false"
        @input="updateSearchGender">
      </multiselect>
    </div>
    <div class="form__footer flex">
      <button class="btn pink" type="submit"> Buscar</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      uf: {
        selected: '',
        options: [],
      },
      city: {
        selected: '',
        options: [],
      },
      type: {
        selected: [],
        options: [
          { name: 'Cão', value: 'DOG' },
          { name: 'Gato', value: 'CAT' },
        ]
      },
      size: {
        selected: [],
        options: [
          { name: 'Pequeno', value: 'SMALL' },
          { name: 'Médio', value: 'MEDIUM' },
          { name: 'Grande', value: 'LARGE' },
        ]
      },
      ageGroup: {
        selected: [],
        options: [
          { name: 'Adulto', value: 'ADULT' },
          { name: 'Filhote', value: 'PUPPY' },
        ]
      },
      gender: {
        selected: [],
        options: [
          { name: 'Macho', value: 'MALE' },
          { name: 'Fêmea', value: 'FEMALE' },
        ]
      },
      toastOptions: {
        duration: 3000,
        keepOnHover: true,
        className: 'adopter-toast',
        position: 'top-left'
      }
    }
  },
  methods: {
    async fetchCities({ id }) {
      const { data } = await axios(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
      this.city.options = data.map(({ nome }) => nome);
    },
    async fetchStates() {
      const { data } = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      this.uf.options = data
        .map(({ id, sigla }) => ({ id, sigla }))
          .sort((a, b) => a.sigla > b.sigla ? 1 : -1);
    },
    resetCities() {
      this.city.selected = '';
    },
    fetchAnimalsByFilter(e) {
      if(this.uf.selected && !this.city.selected) {
        return this.$toasted.show('Selecione uma cidade', this.toastOptions);
      }
      this.$router.push('animals');
    },
    ...mapActions([
      'updateSearchType',
      'updateSearchSize',
      'updateSearchAgeGroup',
      'updateSearchGender',
      'updateSearchFilterCity',
      'resetSearchFilter'
    ])
  },
  async created() {
    this.resetSearchFilter();
    this.fetchStates();
  },
}
</script>

<style lang="scss">
  @import '../../../assets/scss/mixins.scss';
  
  .home__form {
    padding: 0 25px 25px 25px;

    .form__body {
      .address {
        .uf-select {
          width: 100px;
          margin-right: 5px;
        }
      }
    }
    .form__footer {
      justify-content: flex-end;
      margin-top: 10px;

      button {
        width: 145px;
        height: 45px;
      }
    }
  }
</style>
