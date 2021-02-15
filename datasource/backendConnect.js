import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// "https://lline-auth.herokuapp.com/graphql/"
export const authURI = process.env.AUTH_URI || "http://127.0.0.1:8001/graphql/";
export const profileURI =
  process.env.PROFILE_URI || "http://127.0.0.1:8000/graphql/";

export function connectToBackend(backendUri) {
  const httpLink = new HttpLink({
    uri: backendUri,
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
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    onError: (e) => {
      console.log(e);
    },
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return apolloClient;
}
