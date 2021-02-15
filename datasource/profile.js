import { SET_PROFILE, GET_PROFILE } from "../src/constants/graphql";
import { connectToBackend, authURI, profileURI } from "./backendConnect";

const user = JSON.parse(localStorage.getItem("user"));

export function setProfile(profileData) {
  this.$apollo
    .mutate({
      mutation: SET_PROFILE,
      variables: {
        token: user.token,
        profileData: profileData,
      },
    })
    .then((data) => {
      console.log(result);
    });
}

export async function getProfile() {
  const conn = connectToBackend(profileURI);
  let response = await conn
    .mutate({
      mutation: GET_PROFILE,
      variables: {
        token: user.token,
      },
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      const message = error.graphQLErrors[0].message;
      const options = {
        position: "top-center",
        duration: 4000,
        fullWidth: true,
        closeOnSwipe: true,
      };

      this.$toasted.error(message, options);
    });
  return response;
}
