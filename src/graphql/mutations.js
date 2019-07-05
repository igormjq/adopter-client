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

export const CREATE_ANIMAL = gql`mutation createAnimal($data: CreateAnimalInput!) {
  createAnimal(data: $data) {
    id
    name
  }
}`

export const CREATE_ADOPTION_REQUEST = gql`mutation createAdoptionRequest($animalId: ID!) {
  createAdoptionRequest(animalId: $animalId) {
    id
  }
}`

export const ACCEPT_ADOPTION_REQUEST = gql`mutation acceptAdoptionRequest($id: ID!) {
  acceptAdoptionRequest(id: $id) {
    id
    accepted
  }
}`

export const COMMENT_ON_ANIMAL = gql`mutation commentOnAnimal($animalId: ID!, $text: String!) {
  commentOnAnimal(animalId: $animalId, text: $text) {
    id
    comments {
      text
      author {
        name
      }
    }
  }
}`