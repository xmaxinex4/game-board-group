import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import ArrowForwardIcon from "@mui/icons-material/ArrowForwardTwoTone";

import { Button, Grid, Typography } from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { PageLoadingSpinner } from "../../modules/common/progress/page-loading-spinner";
import { useGetLibrary } from "../../modules/library/endpoint-hooks";
import { selectActiveUserGroupLibraryRecentGames } from "../../redux/active-user-group-library-slice";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { LibraryCardList } from "../../modules/library/card-list";

export function Home(): React.ReactElement {
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const recentGames = useSelector(selectActiveUserGroupLibraryRecentGames);

  const history = useHistory();
  const { getLibrary } = useGetLibrary();

  const [loadingRecentGames, setLoadingRecentGames] = useState(false);

  useEffect(() => {
    if (activeGroupMembership?.group.id) {
      getLibrary({
        setIsLoading: setLoadingRecentGames,
      });
    }
  }, [activeGroupMembership]);

  const goToGameLibrary = () => history.push("/library");
  const goToGameCollections = () => history.push("/my-game-collections");

  return (
    <TabContentContainer title={`${activeGroupMembership?.group.name}`}>
      <Grid
        container
        direction="column"
        spacing={4}
        sx={{
          margin: { sm: "auto" },
          maxWidth: "550px",
          minWidth: "275px",
        }}
      >
        {loadingRecentGames && (
          <Grid item>
            <PageLoadingSpinner />
          </Grid>
        )}
        {!loadingRecentGames && (
          recentGames && recentGames.length > 0
            ? (
              <>
                <Grid
                  container
                  direction="column"
                  item
                  spacing={2}
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Grid item sx={{ margin: { xs: "auto", sm: "unset" } }}>
                    <Typography>Recently Added Games</Typography>
                  </Grid>
                  <Grid item>
                    <LibraryCardList size="small" games={recentGames} />
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{
                    margin: { xs: "auto", sm: "unset" },
                    marginLeft: { sm: "auto" },
                    paddingTop: "80px",
                  }}
                >
                  <Button endIcon={<ArrowForwardIcon />} onClick={goToGameLibrary} variant="outlined">View Library</Button>
                </Grid>
              </>
            )
            : (
              <Grid item container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography>
                    No Games in Group Library
                  </Typography>
                </Grid>
                <Grid item>
                  <Button endIcon={<ArrowForwardIcon />} onClick={goToGameCollections} variant="outlined">Add a Collection To See Games</Button>
                </Grid>
              </Grid>
            ))}
      </Grid>
    </TabContentContainer>
  );
}
