import xmlConverter from "xml-js";

import { GameDetails } from "../../../src/types/types";

/**
 * A helper function which converts bgg game details result to a game details object.
 */
export function getExpandedGameDetailsFromBggXmlResult(xml: string): GameDetails[] {
  const games: GameDetails[] = [];

  const convertedJson = JSON.parse(xmlConverter.xml2json(xml, { compact: true }));

  if (!convertedJson && !convertedJson?.items && !convertedJson?.items) {
    throw Error("Could not convert game xml to json");
  }

  let gameItems: any[] = [];

  try {
    gameItems = Array.from(convertedJson?.items?.item);
  } catch {
    gameItems = [];
  }

  if (gameItems?.length < 1) {
    return [];
  }

  gameItems.forEach((game) => {
    const categories: string[] = [];
    const mechanics: string[] = [];
    const designers: string[] = [];
    const artists: string[] = [];
    const publishers: string[] = [];

    if (game.link?.length > 0) {
      game.link.forEach((link: {
        _attributes: {
          type: string;
          value: string;
        };
      }) => {
        switch (link._attributes.type) {
          case "boardgamecategory":
            categories.push(link._attributes.value);
            break;
          case "boardgamemechanic":
            mechanics.push(link._attributes.value);
            break;
          case "boardgamedesigner":
            designers.push(link._attributes.value);
            break;
          case "boardgameartist":
            artists.push(link._attributes.value);
            break;
          case "boardgamepublisher":
            publishers.push(link._attributes.value);
            break;
          default: break;
        }
      });
    }

    games.push({
      bggId: game._attributes.id,
      gameType: game._attributes.type,
      description: game.description._text,
      minPlayers: parseInt(game.minplayers._attributes.value, 10),
      maxPlayers: parseInt(game.maxplayers._attributes.value, 10),
      minPlayTime: parseInt(game.minplaytime._attributes.value, 10),
      maxPlayTime: parseInt(game.maxplaytime._attributes.value, 10),
      minAge: parseInt(game.minage._attributes.value, 10),
      categories,
      mechanics,
      designers,
      artists,
      publishers,
      rating: parseFloat(game.statistics.ratings.average._attributes.value) / 2,
      complexity: parseFloat(game.statistics.ratings.averageweight._attributes.value),
    });
  });

  return games;
}
