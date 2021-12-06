import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
  Grid,
  useMediaQuery,
  Theme,
  useTheme,
  Button,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/RefreshTwoTone";
import ExpandImagesIcon from "@mui/icons-material/GridView";
import MinimizeImagesIcon from "@mui/icons-material/GridOn";

import { LibraryGame } from "../../../../src/types/types";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";

import { GameDetailDialog } from "../game/game-detail-dialog";
import { PageLoadingSpinner } from "../common/progress/page-loading-spinner";
import { LibraryCard } from "./card";
import { SmallLibraryCard } from "./small-card";
import { LibraryFiltersAndSort } from "./library-filters-and-sort";
import { useGetLibrary } from "./endpoint-hooks";
import { getFilteredLibraryGames } from "../../redux/active-user-group-library-slice";

export interface LibraryCardListProps {
  games: LibraryGame[];
  size?: "small";
  noFilters?: boolean;
  noExpand?: boolean;
}

export function LibraryCardList(props: LibraryCardListProps): React.ReactElement {
  const {
    games,
    size,
    noFilters,
    noExpand,
  } = props;

  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const filteredLibraryGames = useSelector(getFilteredLibraryGames);

  const { getLibrary } = useGetLibrary();

  const theme = useTheme<Theme>();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [refreshingLibrary, setRefreshingLibrary] = useState(false);
  const [imagesExpanded, setImagesExpanded] = useState(false);
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

  const onExpandImages = useCallback(() => {
    setImagesExpanded(true);
  }, [setImagesExpanded]);

  const onMinimizeImages = useCallback(() => {
    setImagesExpanded(false);
  }, [setImagesExpanded]);

  const refreshLibrary = useCallback(() => {
    if (activeGroupMembership?.group.id) {
      getLibrary({
        setIsLoading: setRefreshingLibrary,
      });
    }
  }, [setRefreshingLibrary, activeGroupMembership]);

  return (
    <>
      {refreshingLibrary && (
        <PageLoadingSpinner />
      )}
      <Grid container spacing={2}>
        {!refreshingLibrary && (
          <Grid container item justifyContent="flex-end" alignItems="center" spacing={2} sx={{ paddingRight: { sm: "58px" } }}>
            {(!isMdDown && !noExpand) && (
              imagesExpanded
                ? (
                  <Grid item>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      startIcon={<MinimizeImagesIcon />}
                      onClick={onMinimizeImages}
                      aria-label="Minimize Images"
                    >
                      Minimize Images
                    </Button>
                  </Grid>
                )
                : (
                  <Grid item>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      startIcon={<ExpandImagesIcon />}
                      onClick={onExpandImages}
                      aria-label="Expand Images"
                    >
                      Expand Images
                    </Button>
                  </Grid>
                )
            )}
            <Grid item>
              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<RefreshIcon />}
                disabled={refreshingLibrary}
                onClick={refreshLibrary}
                aria-label="Refresh All Collections"
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item sx={{ margin: "auto" }}>
          <Grid container justifyContent="center">
            {!refreshingLibrary && (
              <>
                {!noFilters && (
                  <Grid item>
                    <LibraryFiltersAndSort games={games} />
                  </Grid>
                )}
                <Grid container spacing={3} sx={{ justifyContent: "center" }}>
                  {(noFilters ? games : filteredLibraryGames).map((game) => (
                    size === "small" || isMdDown ? (
                      <Grid key={`library-card-game-bgg-id-${game.bggId}`} item>
                        <SmallLibraryCard openGameDetails={openGameDetails} game={game} />
                      </Grid>
                    ) : (
                      <>
                        {imagesExpanded && (
                          <Grid xs={12} sm={6} lg={4} xl={3} key={`library-card-game-bgg-id-${game.bggId}`} item>
                            <LibraryCard openGameDetails={openGameDetails} game={game} />
                          </Grid>
                        )}
                        {!imagesExpanded && (
                          <Grid key={`library-card-game-bgg-id-${game.bggId}`} item>
                            <SmallLibraryCard openGameDetails={openGameDetails} game={game} />
                          </Grid>
                        )}
                      </>
                    )
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <GameDetailDialog
          open={gameDetailDialogOpen}
          onClose={closeGameDetailDialog}
          game={gameDetails}
        />
      </Grid>
    </>
  );
}
