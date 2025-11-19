import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://10.0.2.2:8000/graphql', 
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});