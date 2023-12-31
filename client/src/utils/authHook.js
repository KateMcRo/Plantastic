// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// create a new class to instantiate for a user
export default function useAuthService() {
  const navigate = useNavigate();
  // get user data
  const getProfile = () => {
    const token = getToken();
    return decode(token);
  };

  // check if user's logged in
  const loggedIn = () => {
    const token = getToken();
    return !!token && !isTokenExpired(token); // handwaiving here
  };

  // check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  };

  const login = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    // window.location.assign("/");
    navigate("/mygarden");
  };

  const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    navigate("/");
  };

  const isLoggedIn = () => {
    const token = getToken();
    return token && !isTokenExpired(token);
  };

  return {
    getProfile,
    loggedIn,
    isTokenExpired,
    getToken,
    login,
    logout,
    isLoggedIn,
  };
}
