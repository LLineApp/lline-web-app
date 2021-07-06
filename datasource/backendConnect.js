import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const profileURI =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/graphql/"
    : "https://llinebknd.herokuapp.com/graphql/";

export function connectToBackend() {
  const httpLink = new HttpLink({
    uri: profileURI,
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
