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
        @select="resetCities"
        @input="fetchCities">
      </multiselect>
      <multiselect
        v-model="city.selected"
        placeholder="Cidade"
        :options="city.options"
        :show-labels="false"
        :preselect-first="true">
      </multiselect>
      <div class="multi-tags">
        <multiselect
          v-model="type.selected"
          placeholder="Tipo"
          label="name"
          track-by="value"
          :close-on-select="false"
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
          :close-on-select="false"
          :multiple="true"
          :options="size.options"
          :show-labels="false"
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
        options: [],
      },
      type: {
        value: [],
        options: [
          { name: 'Cachorro', value: 'DOG' },
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
    }
  },
  methods: {
    async fetchCities({ id }) {
      const { data } = await axios(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
      this.city.options = data.map(({ nome }) => nome);
    },
    resetCities() {
      this.$children[1].select('');
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
    this.$children[1].deactivate();
  },
}
</script>

<style lang="scss">
  .home__form {
    padding: 0 25px;

    .multi-tags {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
    }
  }
</style>
