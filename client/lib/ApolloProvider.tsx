"use client";
import { HttpLink, ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
// import  { createUploadLink } from 'apollo-upload-client'

import { errorLink } from "./errorLink"; 

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
    credentials: 'include', // Include cookies for GraphQL requests
    fetchOptions: { cache: "no-store" },
  });
  

  // Combine the errorLink and httpLink
  const link = ApolloLink.from([errorLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
