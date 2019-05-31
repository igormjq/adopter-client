<template>
  <form class="form home__form flex align-center justify-center">
    <div class="form__body">
      <multiselect 
        v-model="uf.selected" 
        :options="uf.options"
        :show-labels="false"
        :track-by="uf.nome"
        label="nome"
        placeholder="UF"
        :searchable="true"
        @input="fetchCities">
      </multiselect>
      <multiselect
        v-model="city.selected"
        :options="city.options"
        :show-labels="false">
      </multiselect>
      <div class="multiple">
        <multiselect
          v-model="type.selected"
          placeholder="Tipo"
          :multiple="true"
          :options="type.options"
          :show-labels="false"
          label="name"
          :taggable="true"
          @input="updateType"
        >
        </multiselect>
        <multiselect
          v-model="size.selected"
          placeholder="Porte"
          :multiple="true"
          :options="size.options"
          :show-labels="false"
          label="name"
          :taggable="true"
          @input="updateSize"
        >
        </multiselect>
      </div>
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
        options: []
      },
      type: {
        value: [],
        options: [
          { key:'type', name: 'Cachorro', value: 'DOG' },
          { key:'type', name: 'Gato', value: 'CAT' },
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
    }
  },
  methods: {
    async fetchCities({ id }) {
      const { data } = await axios(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
      this.city.options = data.map(({ nome }) => nome);
    },
    ...mapActions([
      'updateType',
      'updateSize',
      'updateAgeGroup',
      'updateGender',
    ])
  },
    async created() {
      const { data } = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      this.uf.options = data.map(({ id, nome }) => ({ id, nome }));
    }
  
}
</script>

<style lang="scss">
  .home__form {
    padding: 0 25px;

    .multiple {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
    }
  }
</style>
