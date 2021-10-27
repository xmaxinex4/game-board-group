import xmlConverter from "xml-js";

import { GameResponse } from "../../../src/types/types";

/**
 * A helper function which converts bgg game search results to a game object.
 */
export function getGamesFromBggXmlResult(xml: string): Pick<GameResponse, "bggId" | "name" | "year">[] {
  const games: Pick<GameResponse, "bggId" | "name" | "year">[] = [];

  const convertedJson = JSON.parse(xmlConverter.xml2json(xml, { compact: true }));

  if (!convertedJson && !convertedJson?.items) {
    throw Error("Could not convert games xml to json");
  }

  const gameItemCount = parseInt(convertedJson?.items?._attributes?.total, 10);
  const gameItems = convertedJson?.items?.item;

  if (gameItemCount === 0) {
    return [];
  }

  // gameItems does not return as array if only 1 result, so we need to set item explicitly
  if (gameItemCount === 1) {
    games.push({
      bggId: gameItems?._attributes?.id,
      name: gameItems?.name?._attributes?.value,
      year: gameItems?.yearpublished?._attributes?.value,
    });
  } else {
    // limit results to a max of 5
    const responseLength = gameItems.length > 5 ? 5 : gameItems.length;

    for (let i = 0; i < responseLength; i += 1) {
      const gameItem = gameItems?.[i];

      games.push({
        bggId: gameItem?._attributes?.id,
        name: gameItem?.name?._attributes?.value,
        year: gameItem?.yearpublished?._attributes?.value,
      });
    }
  }

  return games;
}

export function getGameDetailsFromBggXmlResult(xml: string, bggId: string): GameResponse {
  const convertedJson = JSON.parse(xmlConverter.xml2json(xml, { compact: true }));

  if (!convertedJson && !convertedJson?.items) {
    throw Error("Could not convert game xml to json");
  }

  const gameItem = convertedJson?.items?.item;

  if (!gameItem) {
    throw Error("Game item was not found");
  }

  // game name either returns one non-array if only one name
  // or game name returns an array if multiple names (the first is primary so we use that)
  let gameName = "";
  if (gameItem?.name?.length > 0) {
    gameName = gameItem?.name?.[0]?._attributes?.value;
  } else {
    gameName = gameItem?.name?._attributes?.value || "";
  }

  return {
    bggId,
    urlThumb: gameItem?.thumbnail?._text,
    urlImage: gameItem?.image?._text,
    name: gameName,
    year: gameItem?.yearpublished?._attributes?.value,
  };
}
