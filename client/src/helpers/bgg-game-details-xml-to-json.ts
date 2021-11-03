import xmlConverter from "xml-js";

import { GameDetails } from "../../../src/types/types";

/**
 * A helper function which converts bgg game details result to a game details object.
 */
export function getExpandedGameDetailsFromBggXmlResult(xml: string): GameDetails | null {
  let game: (GameDetails | null) = null;

  const convertedJson = JSON.parse(xmlConverter.xml2json(xml, { compact: true }));

  if (!convertedJson && !convertedJson?.items) {
    // throw Error("Could not convert game xml to json");
    return null;
  }

  const gameItem = convertedJson?.items?.item;

  const categories: string[] = [];
  const mechanics: string[] = [];
  const designers: string[] = [];
  const artists: string[] = [];
  const publishers: string[] = [];

  if (gameItem.link?.length > 0) {
    gameItem.link.forEach((link: {
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

  if (!gameItem) {
    return null;
  }

  game = {
    description: gameItem.description._text,
    minPlayers: parseInt(gameItem.minplayers._attributes.value, 10),
    maxPlayers: parseInt(gameItem.maxplayers._attributes.value, 10),
    minPlayTime: parseInt(gameItem.minplaytime._attributes.value, 10),
    maxPlayTime: parseInt(gameItem.maxplaytime._attributes.value, 10),
    minAge: parseInt(gameItem.minage._attributes.value, 10),
    categories,
    mechanics,
    designers,
    artists,
    publishers,
    rating: parseFloat(gameItem.statistics.ratings.average._attributes.value) / 2,
    complexity: parseFloat(gameItem.statistics.ratings.averageweight._attributes.value),
  };

  return game;
}
