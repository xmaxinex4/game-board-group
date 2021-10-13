import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";

/**
 * A helper function which gets the specified endpoint.
 */
async function get<T>(
  url: string,
  axiosRequestConfig?: AxiosRequestConfig,
  cancelToken?: CancelToken,
): Promise<AxiosResponse<T>> {
  return axios.get(url, {
    headers: axiosRequestConfig?.headers || { "Content-Type": "application/json" },
    params: axiosRequestConfig?.params || undefined,
    cancelToken,
  });
}

/**
 * A helper function which posts to the specified endpoint.
 */
async function post<T>(url: string, data: any, axiosRequestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.post(
    url,
    (data && JSON.stringify(data)) || undefined,
    {
      headers: axiosRequestConfig?.headers || { "Content-Type": "application/json" },
      params: axiosRequestConfig?.params || undefined,
    },
  );
}

const httpHelpers = {
  get,
  post,
};

export default httpHelpers;
