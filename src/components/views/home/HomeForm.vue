<template>
  <form class="form home__form flex align-center justify-center" @submit.prevent="fetchAnimalsByFilter">
    <div class="form__body">
      <div class="address flex">
        <multiselect 
          v-model="uf.selected" 
          label="sigla"
          placeholder="UF"
          class="uf-select"
          :options="uf.options"
          :show-labels="false"
          :searchable="true"
          @select="resetCities"
          @input="fetchCities"
          required>
        </multiselect>
        <multiselect
          v-model="city.selected"
          placeholder="Cidade"
          :options="city.options"
          :show-labels="false"
          :preselect-first="true"
          @input="updateCity">
        </multiselect>
      </div>
      <multiselect
        v-model="type.selected"
        placeholder="Tipo"
        label="name"
        track-by="value"
        :multiple="true"
        :options="type.options"
        :show-labels="false"
        :taggable="true"
        @input="updateType"
      >
      </multiselect>
      <multiselect
        v-model="size.selected"
        placeholder="Porte"
        label="name"
        track-by="value"
        :multiple="true"
        :options="size.options"
        :show-labels="false"
        @input="updateSize"
      >
      </multiselect>
      <multiselect
        v-model="gender.selected"
        placeholder="Sexo"
        label="name"
        track-by="value"
        :multiple="true"
        :options="gender.options"
        :show-labels="false"
        @input="updateGender"
      >
      </multiselect>
    </div>
    <div class="form__footer">
      <button type="submit"> vem</button>
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
        value: [],
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
        className: 'adopter-toast'
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
      'updateType',
      'updateSize',
      'updateAgeGroup',
      'updateGender',
      'updateCity'
    ])
  },
  async created() {
    this.fetchStates();
  },
}
</script>

<style lang="scss">
  @import '../../../assets/scss/mixins.scss';

  .home__form {
    padding: 0 25px;

    .form__body {
      .address {
        .uf-select {
          width: 100px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
