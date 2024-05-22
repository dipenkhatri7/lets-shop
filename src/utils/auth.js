import axios from "axios";

const API_KEY = "AIzaSyDSsZX2tBFZsLYc8c1MDYsKOUkZCduuq_E";

async function authenticate(urlSegment, email, password, fullName = null) {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${urlSegment}?key=${API_KEY}`;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    if (fullName) {
      payload.displayName = fullName;
    }
    const response = await axios.post(url, payload);
    return response.data.idToken;
  } catch (error) {
    console.error("Error during authentication:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

export function createUser(email, password, fullName) {
  return authenticate("signUp", email, password, fullName);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
