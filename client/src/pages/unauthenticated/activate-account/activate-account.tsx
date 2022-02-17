import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";

import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

// import { TabContentContainer } from "../../../modules/common/layout/tab-content-container";

import { useAccountActivate } from "./endpoint-hooks";
import { ResendActivationForm } from "./resend-activation-form";

export function ActivateAccount(): React.ReactElement {
  const { activationCode } = useParams<{ activationCode: string; }>();

  const [progress, setProgress] = React.useState(0);
  const [simulatingProgress, setSimulatingProgress] = useState(false);

  const simulateProgressThenRedirect = useCallback(() => {
    setSimulatingProgress(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, [setProgress, progress]);

  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { activateAccount } = useAccountActivate();

  // Run once on page load
  useEffect(() => {
    activateAccount({
      activationCode,
      onAccountActivated: simulateProgressThenRedirect,
      setIsLoading,
      onError: () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    });
  }, []);

  const onResendEmailSent = useCallback(() => setEmailSent(true), [setEmailSent]);

  return (
    // <TabContentContainer>
    <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
      {isLoading && !simulatingProgress && (
        <Grid container sx={{ padding: "100px" }} justifyContent="center" alignItems="center">
          <CircularProgress size={72} />
        </Grid>
      )}
      {simulatingProgress && !isLoading && (
        <Grid container sx={{ padding: "100px" }} direction="column" alignItems="center" justifyContent="center" spacing={4}>
          <Grid item>
            <Typography>Welcome to GameBoardGroup! Redirecting to homepage...</Typography>
          </Grid>
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <LinearProgress sx={{ width: "500px" }} />
            </Box>
          </Grid>
        </Grid>
      )}
      {!isLoading && !simulatingProgress && (
        <Grid container direction="column" sx={{ padding: "100px" }} justifyContent="center" alignItems="center" spacing={2}>
          {emailSent && (
            <>
              <Grid item>
                <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
              </Grid>
              <Grid item>
                <Typography textAlign="center">
                  The link you followed has expired.
                </Typography>
              </Grid>
            </>
          )}
          <Grid item>
            <ResendActivationForm onSend={onResendEmailSent} />
          </Grid>
        </Grid>
      )}
    </Grid>
    // </TabContentContainer>
  );
}
