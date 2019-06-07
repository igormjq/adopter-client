import { TOGGLE_FAVORITE_ANIMAL } from '../graphql/mutations';

export default {
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