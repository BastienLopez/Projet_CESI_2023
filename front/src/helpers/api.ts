import axios from "axios";

import { store } from "../store/store";

import config from "../config.json";
import { Token } from "../types/token";

const token = store.getState().token?.token as unknown as Token;

const api = axios.create({
  baseURL: config.apiConfig.urlApi + config.apiConfig.portApi,
  headers: {
    "Content-Type": "application/json",
    Authorization: token?.access_token ? `Bearer ${token.access_token}` : "",
  },
});

export default api;
