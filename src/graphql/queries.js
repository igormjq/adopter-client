import gql from 'graphql-tag'

export const GET_ANIMALS = gql`query animals($first: Int, $skip: Int) {
  animals(first: $first, skip: $skip) {
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
}`

export const USER_ME = gql`query me {
  me {
    id
    name
    email
    profileImg
    favoriteAnimals {
      id
    }
    role {
      name
      displayName
    }
  }
}`