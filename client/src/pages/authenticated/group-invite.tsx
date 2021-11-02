import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";

import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import { GroupMembershipResponse } from "../../../../src/types/types";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { useApi } from "../../hooks/useApi";
import { addActiveUserGroupMembership, setSelectedActiveUserGroupMembershipId } from "../../redux/active-user-group-memberships-slice";

export function GroupInvite(): React.ReactElement {
  const { apiPost } = useApi();
  const dispatch = useDispatch();
  const { inviteCode } = useParams<{ inviteCode: string; }>();

  const [progress, setProgress] = React.useState(0);
  const [simulatingProgress, setSimulatingProgress] = useState(false);
  const [error, setError] = useState("");

  const simulateProgressThenRedirect = useCallback(() => {
    setSimulatingProgress(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, [setProgress, progress]);

  const [loadingAddUser, setLoadingAddUser] = useState(false);
  const [groupMembershipResult, setGroupMembershipResult] = useState<GroupMembershipResponse>();

  // Run once on page load
  useEffect(() => {
    setLoadingAddUser(true);
    apiPost<GroupMembershipResponse & { alreadyInGroup: boolean; }>("/group/add-user", {
      guid: inviteCode,
    })
      .then(({ data }) => {
        console.log("data: ", data);
        setGroupMembershipResult(data);

        if (!data.alreadyInGroup) {
          dispatch(addActiveUserGroupMembership({ groupMembership: data }));
        } else {
          dispatch(setSelectedActiveUserGroupMembershipId({ id: data.id }));
        }

        setLoadingAddUser(false);
        simulateProgressThenRedirect();
      })
      .catch(() => {
        setError("Oops! Something went wrong.");
      })
      .finally(() => {
        setLoadingAddUser(false);
      });
  }, []);

  return (
    <TabContentContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
        {loadingAddUser && !simulatingProgress && (
          <Grid container sx={{ padding: "100px" }} justifyContent="center" alignItems="center">
            <CircularProgress size={72} />
          </Grid>
        )}
        {simulatingProgress && !loadingAddUser && (
          <Grid container sx={{ padding: "100px" }} direction="column" alignItems="center" justifyContent="center" spacing={4}>
            <Grid item>
              <Typography>
                {`Welcome to ${groupMembershipResult?.group.name}! Redirecting to homepage...`}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ width: "100%" }}>
                <LinearProgress sx={{ width: "500px" }} />
              </Box>
            </Grid>
          </Grid>
        )}
        {!loadingAddUser && !simulatingProgress && (
          <Grid container direction="column" sx={{ padding: "100px" }} justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item>
              {error ? (
                <Typography>
                  {error}
                </Typography>
              )
                : (
                  <Typography>
                    The link you followed has expired.
                  </Typography>
                )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </TabContentContainer>
  );
}
