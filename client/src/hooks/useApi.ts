import { AxiosResponse } from "axios";

import httpHelpers from "../helpers/http-helpers";

export function useApi() {
  const token = localStorage.getItem("auth-token");
  const apiBaseURL = process.env.NODE_ENV === "production" ? "https://gameboardgroup.com/api" : "http://localhost:9000/api";

  function apiGet<T>(
    endpoint: string,
    params?: any,
  ): Promise<AxiosResponse<T>> {
    return httpHelpers.get<T>(
      `${apiBaseURL}${endpoint}`,
      {
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    );
  }

  function apiPost<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    return httpHelpers.post<T>(
      `${apiBaseURL}${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    );
  }

  return { apiGet, apiPost };
}
