/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { LibraryGame, LibraryReponse } from "../../../../src/types/types";
import { setActiveUserGroupLibrary } from "../../redux/active-user-group-library-slice";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { useApi } from "../../hooks/useApi";
import { getExpandedGameDetailsFromBggXmlResult } from "../../helpers/bgg-game-details-xml-to-json";
import { useBggApi } from "../../hooks/useBggApi";

export interface GetLibraryArgs {
  onLibraryRetrieved?: () => void;
  setIsLoading?: (value: React.SetStateAction<boolean>) => void;
  onError?: (error: Error) => void;
}

export function useGetLibrary() {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const { apiGet } = useApi();
  const dispatch = useDispatch();

  function getLibrary(args: GetLibraryArgs): void {
    const {
      onLibraryRetrieved,
      setIsLoading,
      onError,
    } = args;

    if (setIsLoading) {
      setIsLoading(true);
    }

    const { bggApiGet } = useBggApi();

    apiGet<LibraryReponse>("/library", { groupId: activeGroupMembership?.group.id })
      .then(async ({ data }) => {
        const library = Object.values(data.library);
        const gameBggIdsString = library.map((game) => game.bggId).join(",");

        const { data: gameDetailsXML } = await bggApiGet(`/thing?id=${gameBggIdsString}&stats=1`);
        const newLibrary: LibraryGame[] = [];

        if (gameDetailsXML as string) {
          const gameDetails = getExpandedGameDetailsFromBggXmlResult(gameDetailsXML as string);

          if (gameDetails && gameDetails.length > 0) {
            library.forEach((game) => {
              newLibrary.push({ ...game, gameDetails: gameDetails.find((detail) => detail.bggId === game.bggId) });
            });
          }
        }

        if (activeGroupMembership?.group.id) {
          dispatch(setActiveUserGroupLibrary({
            groupId: activeGroupMembership.group.id,
            newLibrary,
          }));
        } else {
          throw Error("No active group is selected");
        }

        if (onLibraryRetrieved) {
          onLibraryRetrieved();
        }
      })
      .catch((error: Error) => {
        // TODO: Better error handling
        console.log("getting library error: ", error);
        if (onError) {
          onError(error);
        }
      })
      .finally(() => {
        if (setIsLoading) {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      });
  }

  return { getLibrary };
}
