import {
  SET_PROFILE,
  GET_PROFILE,
  GET_PROFILE_FIELDS,
  GET_ADVISOR_BY_LINK,
  GET_ADVISORS_PORTFOLIO,
  GET_PROSPECT_PROFILE,
  GET_ADVISOR_LINK,
} from "../src/constants/graphql";
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
  delete data["requestAdvisorStatus"];
  if (data["cpf"] == "") {
    delete data["cpf"];
  }
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

export async function getAdvisorsPortfolio(page, search) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISORS_PORTFOLIO,
    variables: {
      token: user.token,
      page: page,
      containing: search
    },
  });
}

export async function getProspectProfile(page, search) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_PROSPECT_PROFILE,
    variables: {
      token: user.token,
      page: page,
      containing: search
    },
  });
}

export async function getAdvisorByLink(advisorsLink) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISOR_BY_LINK,
    variables: {
      token: user.token,
      link: advisorsLink,
    },
  });
}

export async function getAdvisorLink() {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISOR_LINK,
    variables: {
      token: user.token,
    },
  });
}

export async function getSomeFieldsFromProfile(fields) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_PROFILE_FIELDS(fields.join('\n')),
    variables: {
      token: user.token,
    },
  });
}

export function handleError(message) {
  const options = {
    position: "top-center",
    duration: 4000,
    fullWidth: true,
    closeOnSwipe: true,
  };

  this.$toasted.error(message, options);
}
