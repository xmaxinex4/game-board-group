import {
  AxiosResponse,
  CancelToken,
} from "axios";

import httpHelpers from "../helpers/http-helpers";

export function useBggApi() {
  async function bggApiGet<T>(
    endpoint: string,
    cancelToken?: CancelToken,
  ): Promise<AxiosResponse<T>> {
    return httpHelpers.get<T>(
      `https://boardgamegeek.com/xmlapi2${endpoint}`,
      {
        headers: {
          "Content-Type": "application/xml",
          // "Cache-Control": "max-age=3600",
        },
      },
      cancelToken,
    );
  }

  return { bggApiGet };
}
