import React, { useCallback, useState } from "react";

import {
  Grid,
  useMediaQuery,
  Theme,
  useTheme,
  Button,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/RefreshTwoTone";

import { LibraryGame } from "../../../../src/types/types";

import { GameDetailDialog } from "../game/game-detail-dialog";
import { PageLoadingSpinner } from "../common/progress/page-loading-spinner";
import { LibraryCard } from "./card";
import { SmallLibraryCard } from "./small-card";
import { LibraryFiltersAndSort } from "./library-filters-and-sort";

export interface LibraryCardListProps {
  games: LibraryGame[];
  size?: "small";
  onRefresh?: () => void;
  refreshingLibrary?: boolean;
  noFilters?: boolean;
}

export function LibraryCardList(props: LibraryCardListProps): React.ReactElement {
  const {
    games,
    size,
    onRefresh,
    refreshingLibrary,
    noFilters,
  } = props;

  const theme = useTheme<Theme>();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredGames, setFilteredGames] = useState(games);
  const [gameDetailDialogOpen, setGameDetailDialogOpen] = useState(false);
  const [gameDetails, setGameDetails] = useState<LibraryGame>();

  const closeGameDetailDialog = useCallback(
    () => setGameDetailDialogOpen(false),
    [setGameDetailDialogOpen],
  );

  const openGameDetails = useCallback((game: LibraryGame) => {
    setGameDetails(game);
    setGameDetailDialogOpen(true);
  }, [setGameDetails, setGameDetailDialogOpen]);

  return (
    <>
      <Grid container justifyContent="center">
        {onRefresh && (
          <Grid item sx={{ marginLeft: "auto" }}>
            <Button
              variant="text"
              color="primary"
              size="small"
              startIcon={<RefreshIcon />}
              disabled={refreshingLibrary}
              onClick={onRefresh}
              aria-label="Refresh All Collections"
            >
              Refresh
            </Button>
          </Grid>
        )}
        {refreshingLibrary && (
          <PageLoadingSpinner />
        )}
        {!refreshingLibrary && (
          <>
            {!noFilters && (
              <Grid item>
                <LibraryFiltersAndSort games={games} setFilteredGames={setFilteredGames} />
              </Grid>
            )}
            <Grid container spacing={3} sx={{ justifyContent: "center" }}>
              {filteredGames.map((game) => (
                size === "small" || isMdDown ? (
                  <Grid key={`library-card-game-bgg-id-${game.bggId}`} item>
                    <SmallLibraryCard openGameDetails={openGameDetails} game={game} />
                  </Grid>
                ) : (
                  <Grid xs={12} sm={6} lg={4} xl={3} key={`library-card-game-bgg-id-${game.bggId}`} item>
                    <LibraryCard openGameDetails={openGameDetails} game={game} />
                  </Grid>
                )
              ))}
            </Grid>
          </>
        )}
      </Grid>
      <GameDetailDialog
        open={gameDetailDialogOpen}
        onClose={closeGameDetailDialog}
        game={gameDetails}
      />
    </>
  );
}
