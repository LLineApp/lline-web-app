import { SET_PROFILE, GET_PROFILE } from "../src/constants/graphql";
import { connectToBackend, authURI, profileURI } from "./backendConnect";

const user = JSON.parse(localStorage.getItem("user"));

export async function setProfile(profileInput) {
  const data = sanitize(profileInput);
  const conn = connectToBackend(profileURI);

  return await conn.mutate({
    mutation: SET_PROFILE,
    variables: {
      token: user.token,
      profileData: data,
    },
  });
}

function sanitize(data) {
  delete data["requestBrokerStatus"];
  for (var item in data) {
    if (Array.isArray(data[item])) {
      const sanitizedItem = [];
      data[item].forEach((element) => {
        delete element["key"];
        sanitizedItem.push(element);
      });
      data[item] = sanitizedItem;
    }
  }
  return data;
}

export async function getProfile() {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_PROFILE,
    variables: {
      token: user.token,
    },
  });
}
