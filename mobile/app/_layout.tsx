import React from 'react';
import { Slot } from 'expo-router';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../src/graphql/apollo'; 

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  );
}