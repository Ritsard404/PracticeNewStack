import { jwtDecode as jwt_decode } from "jwt-decode";
import moment from "moment";
import { toast } from "react-toastify";

export function ValidateToken() {
  const token = localStorage.getItem("token");

  if (!token) return false; // No token found, return false

  try {
    // Decode token to get expiration time
    const decodedToken: { exp: number } = jwt_decode(token);

    // Convert expiration time to moment
    const tokenExpireTime = moment.unix(decodedToken.exp);

    // If the token is expired (or will expire in less than 2 minutes), return false
    if (tokenExpireTime.diff(moment(), "minutes") < 2) {
      return false;
    }

    return true; // Token is valid
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    toast.error("Token expired!")
    toast.info("Logged out!")
    return false; // Return false if decoding fails
  }
}

export default ValidateToken;
