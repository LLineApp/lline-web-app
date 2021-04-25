export function authHeader() {
    // return authorization header with jwt token
    let token = Vue.$cookies.get("token");

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}