import axios from "axios";

const instance = axios.create();
export const sameOriginInstance = axios.create({
  baseURL: window.location.origin + "/"
});
export default instance;