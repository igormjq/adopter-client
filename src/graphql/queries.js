import gql from 'graphql-tag'

export const GET_ANIMALS = gql`query {
  animals {
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