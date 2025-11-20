import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://nonmanipulatory-fearsomely-nathanial.ngrok-free.dev/graphql/', 
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});