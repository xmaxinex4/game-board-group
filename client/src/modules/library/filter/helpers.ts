import { LibraryGame } from "../../../../../src/types/types";
import { LibraryGameFilters } from "./model";

function sortGames(sort: string, games: LibraryGame[]): LibraryGame[] {
  const sortedGames = [...games];

  switch (sort) {
    case "nameDesc":
      sortedGames.sort((a, b) => ((a.name < b.name) ? 1 : -1));
      return sortedGames;
    case "nameAsc":
      sortedGames.sort((a, b) => ((a.name > b.name) ? 1 : -1));
      return sortedGames;
    case "lowHighComp":
      sortedGames.sort((a, b) => ((a.gameDetails && b.gameDetails && (a.gameDetails.complexity > b.gameDetails.complexity)) ? 1 : -1));
      return sortedGames;
    case "highLowComp":
      sortedGames.sort((a, b) => ((a.gameDetails && b.gameDetails && (a.gameDetails.complexity < b.gameDetails.complexity)) ? 1 : -1));
      return sortedGames;
    case "shortestTimes":
      sortedGames.sort((a, b) => (((a.gameDetails && b.gameDetails) && a.gameDetails.maxPlayTime > b.gameDetails.maxPlayTime) ? 1 : -1));
      return sortedGames;
    case "longestTimes":
      sortedGames.sort((a, b) => (((a.gameDetails && b.gameDetails) && a.gameDetails.maxPlayTime < b.gameDetails.maxPlayTime) ? 1 : -1));
      return sortedGames;
    case "newest":
      sortedGames.sort((a, b) => (((a.year && b.year) && a.year < b.year) ? 1 : -1));
      return sortedGames;
    case "oldest":
      sortedGames.sort((a, b) => (((a.year && b.year) && a.year > b.year) ? 1 : -1));
      return sortedGames;
    case "recentlyAdded":
      sortedGames.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      return sortedGames;
    default:
      return sortedGames;
  }
}

function filterGames(filters: LibraryGameFilters, games: LibraryGame[]): LibraryGame[] {
  const filteredGames = [...games];

  // TODO: Filter Games

  return filteredGames;
}

/**
 * A helper function to sort and filter games
 */
export function sortAndFilterGames(games: LibraryGame[], sort: string, filters?: LibraryGameFilters): LibraryGame[] {
  const sortedGames = sortGames(sort, games);

  if (filters) {
    filterGames(filters, sortedGames);
  }

  return sortedGames;
}
