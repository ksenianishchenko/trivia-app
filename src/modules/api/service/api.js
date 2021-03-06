import axios from "axios";

const API = axios.create({
  baseURL: `https://luxmes70uh.execute-api.us-west-2.amazonaws.com/dev/`,
  timeout: 5000,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  crossDomain: true
});

export default API;