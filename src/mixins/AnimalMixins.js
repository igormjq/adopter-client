import { TOGGLE_FAVORITE_ANIMAL } from '../graphql/mutations';

export default {
  data() {
    return {
      animalInfo: [
        { key: 'vaccinated', displayName: (gender) => 'Vacinad' + this.parseWordToGender(gender) , iconName: 'syringe'  },
        { key: 'castrated', displayName: (gender) => 'Castrad' + this.parseWordToGender(gender), iconName: 'briefcase-medical' },
        { key: 'dewormed', displayName: (gender) => 'Desverminad' + this.parseWordToGender(gender), iconName: 'pills' },
        { key: 'specialNeeds', displayName: (gender) => 'Necessidades especiais', iconPath: require('../assets/img/icon/animal/special-needs.svg') }
      ]
    }
  },
  methods: {
    animalType({ type }) {
      return type === 'DOG' ? 'Cão' : 'Gato';
    },
    animalGender({ gender }) {
      return gender === 'MALE' ? 'Macho' : 'Fêmea';
    },
    animalAgeGroup({ ageGroup }) {
      return ageGroup === 'ADULT' ? 'Adulto' : 'Filhote';
    },
    animalSize({ size }, targetSize) {
      return size.toLowerCase() === targetSize;
    },
    animalIsFavorite(animalId) {
      if(this.user) return this.user.favoriteAnimals.some(({ id }) => id === animalId);
    },
    parseWordToGender(gender) {
      switch(gender) {
        case 'MALE':
          return 'o';
        case 'FEMALE':
          return 'a';
        default:
          return '';
      }
    },
    async toggleFavoriteAnimal(animal) {
      if(!this.user) 
        return this.$toasted.show('Faça login para curtir a bicharada :)', this.toastOptions);

      try {
        const { 
          data: { 
            toggleFavoriteAnimal: { operation, message, success }
          }
        } = await this.$apollo.mutate({
          mutation: TOGGLE_FAVORITE_ANIMAL,
          variables: {
            animalId: animal.id
          }
        });

        if(success) {
          this.$store.dispatch(operation, animal);
          this.$toasted.show(`${animal.name} ${message}`, this.toastOptions);
        }
        
      } catch (e) {
        alert(e);
      }
    },
  },
};