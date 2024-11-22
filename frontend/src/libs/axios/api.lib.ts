import { apiConfig } from "@/config/api.config";
import axios from "axios";

export function setupApiClient(ctx = undefined) {
  const api = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
  });

  api.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      if (error.response.status === 500) {
        alert("Servidor não encontrado");
      }

      return Promise.reject(error);
    }
  );

  return api;
}
