import {
  SET_PROFILE,
  GET_PROFILE,
  GET_CLIENT_PROFILE,
  GET_PROFILE_FIELDS,
  GET_ADVISOR_BY_LINK,
  GET_ADVISORS_PORTFOLIO,
  GET_PROSPECT_PROFILE,
  GET_ADVISOR_LINK,
  GET_ADVISORS,
} from "../src/constants/graphql";
import { connectToBackend, profileURI } from "./backendConnect";
import { sanitize } from "./dataSanitizer";

export async function setProfile(token, profileInput) {
  const data = sanitize(profileInput);
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: SET_PROFILE,
    variables: {
      token: token,
      profileData: data,
    },
  });
}

export async function getProfile(token, cpf) {
  const conn = connectToBackend(profileURI);
  var mutation = GET_PROFILE;
  const variables = {
    token: token,
  }
  if (cpf) {
    mutation = GET_CLIENT_PROFILE;
    variables["cpf"] = cpf; 
  }
  return await conn.mutate({
    mutation: mutation,
    variables: variables,
  });
}

export async function getAdvisorsPortfolio(token, page, search) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISORS_PORTFOLIO,
    variables: {
      token: token,
      page: page,
      containing: search,
    },
  });
}

export async function getProspectProfile(token, page, search) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_PROSPECT_PROFILE,
    variables: {
      token: token,
      page: page,
      containing: search,
    },
  });
}

export async function getAllAdvisors(token) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISORS,
    variables: {
      token: token,
      page: -1,
      containing: "",
    },
  });
}

export async function getAdvisorByLink(token, advisorsLink) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISOR_BY_LINK,
    variables: {
      token: token,
      link: advisorsLink,
    },
  });
}

export async function getAdvisorLink(token) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_ADVISOR_LINK,
    variables: {
      token: token,
    },
  });
}

export async function getSomeFieldsFromProfile(token, fields) {
  const conn = connectToBackend(profileURI);
  return await conn.mutate({
    mutation: GET_PROFILE_FIELDS(fields.join("\n")),
    variables: {
      token: token,
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
