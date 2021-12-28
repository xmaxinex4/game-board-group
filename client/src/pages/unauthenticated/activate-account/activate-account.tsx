import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";
import EmailIcon from "@mui/icons-material/Email";

import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import { TabContentContainer } from "../../../modules/common/layout/tab-content-container";

import { useAccountActivate } from "./endpoint-hooks";
import { FullWidthGridItemInput } from "../../../modules/common/input/full-width-grid-item-input";
import { ActionButtons } from "../../../modules/common/button/action-buttons";
import { validateEmail } from "../../../modules/account/email-validator";

export function ActivateAccount(): React.ReactElement {
  const { code: activationCode } = useParams<{ code: string; }>();
  const history = useHistory();

  const [progress, setProgress] = React.useState(0);
  const [simulatingProgress, setSimulatingProgress] = useState(false);

  const simulateProgressThenRedirect = useCallback(() => {
    setSimulatingProgress(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, [setProgress, progress]);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const { activateAccount } = useAccountActivate();

  // Run once on page load
  useEffect(() => {
    activateAccount({
      activationCode,
      onAccountActivated: simulateProgressThenRedirect,
      setIsLoading,
      onError: (error) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    });
  }, []);

  const goToLogin = () => history.push("/login");

  const clearErrorFields = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  // check for valid email
  const handleSubmit = () => {
    const isFormValid = validateEmail(email, setErrors);

    // resend verify account email
    if (isFormValid) {
      // editAccount({
      //   username,
      //   color,
      //   setIsLoading,
      //   onAccountEdited,
      // });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <TabContentContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
        {isLoading && !simulatingProgress && (
          <Grid container sx={{ padding: "100px" }} justifyContent="center" alignItems="center">
            <CircularProgress size={72} />
          </Grid>
        )}
        {simulatingProgress && !isLoading && (
          <Grid container sx={{ padding: "100px" }} direction="column" alignItems="center" justifyContent="center" spacing={4}>
            <Grid item>
              <Typography>
                {`Welcome to GameBoardGroup! Redirecting to homepage...`}
              </Typography>
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
            <Grid item>
              <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item>
              <Typography>
                The link you followed has expired.
              </Typography>
            </Grid>
            <Grid item>
              <form noValidate onSubmit={handleFormSubmit}>
                <Grid container item direction="column" spacing={8}>
                  <FullWidthGridItemInput
                    formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
                    outerEndAdornmentIcon={EmailIcon}
                    input={email}
                    inputProps={{ maxLength: 50 }}
                    outlinedInputProps={{ id: "email" }}
                    inputLabel="Email"
                    setInputState={setEmail}
                    error={errors.email}
                    onInputChange={clearErrorFields}
                  />
                  <Grid item>
                    <ActionButtons
                      formButtons
                      onSave={handleSubmit}
                      saveText="Resend Activation Email"
                      onCancel={goToLogin}
                      cancelText="Go to Login"
                      disabled={isLoading}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        )}
      </Grid>
    </TabContentContainer>
  );
}
