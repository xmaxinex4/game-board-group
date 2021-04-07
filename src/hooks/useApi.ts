import { AxiosResponse } from "axios";

import httpHelpers from "../helpers/http-helpers";

export function useApi() {
  const token = localStorage.getItem("auth-token");

  function apiGet<T>(
    endpoint: string,
    params?: any,
  ): Promise<AxiosResponse<T>> {
    return httpHelpers.get<T>(
      `https://game-board-group-heroku-api.herokuapp.com/api${endpoint}`,
      {
        params,
        headers: {
          "Access-Control-Allow-Origin": "https://game-board-group-heroku-api.herokuapp.com/",
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    );
  }

  function apiPost<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    return httpHelpers.post(`https://game-board-group-heroku-api.herokuapp.com/api${endpoint}`, data, {
      headers: {
        "Access-Control-Allow-Origin": "https://game-board-group-heroku-api.herokuapp.com/",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  return { apiGet, apiPost };
}