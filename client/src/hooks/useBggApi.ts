import { AxiosResponse } from "axios";

import httpHelpers from "../helpers/http-helpers";

export function useBggApi() {
  function bggApiGet<T>(
    endpoint: string,
  ): Promise<AxiosResponse<T>> {
    return httpHelpers.get<T>(
      `https://boardgamegeek.com/xmlapi2${endpoint}`,
      { headers: { "Content-Type": "application/xml" } },
    );
  }

  return { bggApiGet };
}
