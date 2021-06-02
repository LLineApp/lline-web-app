import { loginData } from "../_store/login.module";

export function authHeader() {
  return loginData.state.data.token
    ? { Authorization: "Bearer " + loginData.state.data.token }
    : {};
}
