import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';

// HTTP connection to the API
const uri = window.location.protocol.startsWith('https') ? 
'https://adopter-api.herokuapp.com/' : 
'http://localhost:4000'

const httpLink = createHttpLink({
  uri,
});

// Cache implementation
const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const defaultOptions = {
  query: {
    fetchPolicy: 'network-only'
  }
}

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions
})

export default apolloClient