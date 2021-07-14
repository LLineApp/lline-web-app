import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { backendURI } from "../src/_helpers/backend.js";

export function connectToBackend() {
  const httpLink = new HttpLink({
    uri: backendURI("graphql/"),
    useGETForQueries: false,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    fetchOptions: {
      mode: "cors",
    },
    onError: ({ networkError, graphQLErrors }) => {
      console.error("graphQLErrors", graphQLErrors);
      console.error("networkError", networkError);
    },
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    onError: (e) => {
      console.error(e);
    },
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return apolloClient;
}
