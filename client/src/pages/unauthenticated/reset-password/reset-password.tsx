import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";

import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import { TabContentContainer } from "../../../modules/common/layout/tab-content-container";
import { ActionButtons } from "../../../modules/common/button/action-buttons";
import { FullWidthGridItemPasswordInput } from "../../../modules/common/input/full-width-grid-item-password-input";
import { validatePassword } from "../../../modules/account/password-validator";

import { useResetPassword } from "./endpoint-hooks";
import { SiteLink } from "../../../modules/common/navigation/site-link";

export function ResetPassword(): React.ReactElement {
  const { code: resetPasswordCode } = useParams<{ code: string; }>();
  const history = useHistory();

  const [progress, setProgress] = React.useState(0);
  const [simulatingProgress, setSimulatingProgress] = useState(false);
  const { resetPassword, isActivePasswordResetCode } = useResetPassword();

  const simulateProgressThenRedirect = useCallback(() => {
    setSimulatingProgress(true);
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }, [setProgress, progress]);

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordIsActive, setPasswordIsActive] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordOverrideControl = {
    showPassword,
    setShowPassword,
  };

  const clearErrorFields = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  // Run once on page load
  useEffect(() => {
    isActivePasswordResetCode({
      resetPasswordCode,
      onPasswordResetCodeActiveStatusReceived: setPasswordIsActive,
      setIsLoading,
    });
  }, []);

  const setNewPassword = useCallback(() => {
    resetPassword({
      resetPasswordCode,
      newPassword: password,
      onPasswordReset: simulateProgressThenRedirect,
      setIsLoading,
      onError: () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    });
  }, [resetPasswordCode, password, simulateProgressThenRedirect]);

  const handleSubmit = () => {
    const isFormValid = validatePassword(password, confirmPassword, setErrors);

    if (isFormValid) {
      setNewPassword();
    }
  };

  const goToLogin = () => history.push("/login");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <TabContentContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={4}>
        {isLoading ? (
          <Grid container sx={{ padding: "100px" }} justifyContent="center" alignItems="center">
            <CircularProgress size={72} />
          </Grid>
        ) : (
          <>
            {((!passwordIsActive && !simulatingProgress) || (!passwordIsActive && simulatingProgress)) && (
              <Grid container direction="column" sx={{ padding: "100px" }} justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <MoodBadTwoToneIcon color="primary" sx={{ fontSize: 80 }} />
                </Grid>
                <Grid item>
                  <Typography>
                    The link you followed has expired.
                  </Typography>
                </Grid>
                <Grid container item justifyContent="center" spacing={1}>
                  <Grid item>
                    <Typography>
                      Back to Login
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <SiteLink to="/login" text="Login" />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {simulatingProgress && passwordIsActive && (
              <Grid container sx={{ padding: "100px" }} direction="column" alignItems="center" justifyContent="center" spacing={4}>
                <Grid item>
                  <Typography> Password reset, Redirecting to login...</Typography>
                </Grid>
                <Grid item>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress sx={{ width: "500px" }} />
                  </Box>
                </Grid>
              </Grid>
            )}
            {passwordIsActive && !simulatingProgress && (
              <Grid container direction="column" sx={{ padding: "100px" }} justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <form noValidate onSubmit={handleFormSubmit}>
                    <Grid container item direction="column" spacing={8}>
                      <FullWidthGridItemPasswordInput
                        formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
                        input={password}
                        setInputState={setPassword}
                        error={errors.password}
                        onInputChange={clearErrorFields}
                        showPasswordOverrideControl={showPasswordOverrideControl}
                      />

                      <FullWidthGridItemPasswordInput
                        formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
                        input={confirmPassword}
                        fullWidthGridItemInputId="confirmPassword"
                        inputLabel="Confirm Password"
                        setInputState={setConfirmPassword}
                        error={errors.confirmPassword}
                        onInputChange={clearErrorFields}
                        showPasswordOverrideControl={showPasswordOverrideControl}
                      />

                      <Grid item>
                        <ActionButtons
                          formButtons
                          onSave={handleSubmit}
                          saveText="Reset Password"
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
          </>
        )}
      </Grid>
    </TabContentContainer>
  );
}
