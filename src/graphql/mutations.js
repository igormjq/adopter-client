import gql from 'graphql-tag';

export const LOG_USER = gql`mutation login($email: String!, $password: String!) {
  login(data: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
      name
      email
      profileImg
      favoriteAnimals {
        id
        profileImg
        name
        type
        size
        gender
        ageGroup
        address {
          city
          uf
        }
      }
      role {
        name
        displayName
      }
    }
  }
}`

export const TOGGLE_FAVORITE_ANIMAL = gql`mutation toggleFavoriteAnimal($animalId: ID!) {
  toggleFavoriteAnimal(animalId: $animalId) {
    success
    operation
    message
  }
}`