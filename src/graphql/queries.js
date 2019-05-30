import gql from 'graphql-tag'

export const GET_ANIMALS = gql`query animals($first: Int, $skip: Int, $where: AnimalWhereInput) {
  animals(first: $first, skip: $skip, where: $where) {
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
}`