import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const development = {
  AUTH_URI: "http://127.0.0.1:8001/graphql/",
  PROFILE_URI: "http://127.0.0.1:8000/graphql/",
};

const production = {
  AUTH_URI: "https://lline-auth.herokuapp.com/graphql/",
  PROFILE_URI: "https://llinebknd.herokuapp.com/graphql/",
};

export const authURI =
  process.env.NODE_ENV === "development"
    ? development.AUTH_URI
    : production.AUTH_URI;
export const profileURI =
  process.env.NODE_ENV === "development"
    ? development.PROFILE_URI
    : production.PROFILE_URI;

export function connectToBackend(backendUri) {
  const httpLink = new HttpLink({
    uri: backendUri,
    useGETForQueries: false,
    credentials: "include",
    // method: "POST",
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
