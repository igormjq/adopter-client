
import { FetchStates, FetchCities } from '../services/LocationService';

export default {
  data() {
    return {
      locationService: {
        uf: {
          selected: '',
          options: [],
        },
        city: {
          selected: '',
          options: [],
        }
      }
    }
  },
  methods: {
    async getCitiesByUf({ id }) {
      this.$store.dispatch('loadPage');
      this.locationService.city.options = await FetchCities(id);
      this.$store.dispatch('loadPage', false);
    },
    resetCities() {
      this.locationService.city.selected = '';
    },
  },
  async created() {
    this.locationService.uf.options = await FetchStates();
  }
}