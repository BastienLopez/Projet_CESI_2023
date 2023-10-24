import api from "../helpers/api";
import { Token } from "../types/token";

export async function login(login: string, password: string) {
  try {
    const { data } = await api.post<Token>("/auth/login", {
      login,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
