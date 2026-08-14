import axios from "axios";
import api from "../constant/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Redirect user to Google OAuth login
 */
export function googleLogin() {
  console.log("Redirecting to Google Login...");

  // Spring Security OAuth2 entry point
  window.location.href = `${BASE_URL}/oauth2/authorization/google`;
}
/**
 * Register User
 */
export async function register(user) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/register`, user);

    return data;
  } catch (error) {
    console.error("Registration Failed:", error);
    throw error;
  }
}

/**
 * Login with Email & Password
 */
export async function login(credentials) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, credentials);

    // Store authentication details
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);

    // Optional (if backend returns these)
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    if (data.name) {
      localStorage.setItem("name", data.name);
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error);

    // Let the component decide how to display the error
    throw error;
  }
}

/**
 * Logout
 */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("email");
  localStorage.removeItem("name");

  window.location.href = "/";
}

export async function preflight() {

  try {
    await axios.get(`${BASE_URL}/api/auth/`);
    console.log("Backend awake");
  } catch(error) {
    console.log("Backend wake failed");
  }


  try {
    await axios.get(`${import.meta.env.VITE_ML_BASE_URL}/`);
    console.log("ML service awake");
  } catch(error) {
    console.log("ML service wake failed");
  }

}