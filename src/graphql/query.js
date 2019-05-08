import gql from 'graphql-tag'

export const ANIMALS_LIST = gql`query {
  animals {
    id
    name
    size
  }
}`