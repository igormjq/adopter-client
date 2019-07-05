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

export const GET_ANIMAL = gql`query animal($id: ID!) {
  animal(id: $id) {
    id
    name
    type
    about
    gender
    ageGroup
    castrated
    vaccinated
    dewormed
    specialNeeds
    profileImg
    owner {
      id
      name
      phone
      email
    }
    comments {
      id
      text
      author {
        id
        name
      }
    }
    photos
  }
} `

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
    address {
      city
      uf
    }
    role {
      name
      displayName
    }
  }
}`;

export const GET_ADOPTION_REQUESTS = gql`{
  me {
    id
    receivedAdoptionRequests {
      id
      animal {
        name
        type
      }
      sentBy {
        name
        email
      }
      accepted
    }
    adoptionRequests {
      id
      animal {
        name
        type
        owner {
          name
          email
        }
      }
      sentBy {
        name
        email
      }
      accepted
    }
  }
}`