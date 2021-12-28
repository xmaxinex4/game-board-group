import React, { useState } from "react";

import {
  Grid,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import { useApi } from "../../hooks/useApi";
import { FullWidthGridItemPasswordInput } from "../common/input/full-width-grid-item-password-input";
import { SiteLink } from "../common/navigation/site-link";
import { FullWidthGridItemInput } from "../common/input/full-width-grid-item-input";
import { LoginFormModel } from "./model";
import { validateLoginForm } from "./validator";
import { ActionButtons } from "../common/button/action-buttons";

export function LoginForm(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormModel>({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const clearErrorFields = (e: React.ChangeEvent) => {
    setServerError("");
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const { apiPost } = useApi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateLoginForm({ email, password }, setErrors);

    if (isFormValid) {
      setIsLoading(true);
      apiPost<{ token: string; }>("/user/login", { email: email.toLowerCase(), password })
        .then(({ data }) => {
          localStorage.setItem("auth-token", data?.token);
          window.location.href = "/";
        })
        .catch(({ response }) => {
          const error = response?.data?.error;
          setServerError(error || "Something went wrong. Please try again.");

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={8}>
        <Grid container item direction="column" spacing={4}>
          {serverError && serverError === "User is not active" ? (
            <Grid container direction="column" spacing={2}>
              {/* <Grid item>This account has not been activated. Resend an activation link to your email below.</Grid>
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
              </Grid> */}
            </Grid>
          ) : (
            <>
              {serverError && (
                <Grid item>
                  <Alert severity="error">{serverError}</Alert>
                </Grid>
              )}
              <FullWidthGridItemInput
                formControlProps={{ disabled: isLoading, fullWidth: true }}
                outerEndAdornmentIcon={EmailIcon}
                input={email}
                inputProps={{ maxLength: 50 }}
                outlinedInputProps={{ id: "email" }}
                inputLabel="Email"
                setInputState={setEmail}
                error={errors.email}
                onInputChange={clearErrorFields}
              />

              <Grid container item spacing={1}>
                <FullWidthGridItemPasswordInput
                  formControlProps={{ disabled: isLoading, fullWidth: true }}
                  input={password}
                  setInputState={setPassword}
                  error={errors.password}
                  onInputChange={clearErrorFields}
                />
                <Grid container item justifyContent="flex-end">
                  <Typography>
                    <SiteLink text="Forgot Password?" to="/forgot-password" />
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">
                  Login
                </Button>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container item justifyContent="center" spacing={1}>
          <Grid item>
            <Typography>
              Don&apos;t have an account?
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <SiteLink text="Signup" to="/create-account" />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form >
  );
}
