import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import {
  Alert,
  Grid,
  InputLabel,
  Typography,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MoodHappyIcon from "@mui/icons-material/MoodTwoTone";

import { Color } from ".prisma/client";

import { ErrorDisplay } from "../../common/error/error-display";
import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { FullWidthGridItemPasswordInput } from "../../common/input/full-width-grid-item-password-input";
import { MeepleColorPicker } from "../../common/meeple-color-picker";
import { SiteLink } from "../../common/navigation/site-link";
import { PageLoadingSpinner } from "../../common/progress/page-loading-spinner";
import { ActionButtons } from "../../common/button/action-buttons";

import { CreateUserFormModel } from "./model";
import { validateCreateUserForm } from "./validator";
import { useCreateUser } from "./endpoint-hooks";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  loginLink: ({
    color: theme.palette.primary.main,
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  }),
}));

export function CreateUserForm(): React.ReactElement {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [color, setColor] = useState<Color>("Red");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Omit<CreateUserFormModel, "color"> & { color: string; }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
  });

  const history = useHistory();

  const { loginLink } = useStyles();
  const { createUser } = useCreateUser();

  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordOverrideControl = {
    showPassword,
    setShowPassword,
  };

  const clearErrorFields = (e: React.ChangeEvent) => {
    setServerError("");
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = () => {
    const isFormValid = validateCreateUserForm({
      username,
      email,
      password,
      confirmPassword,
      color,
    }, setErrors);

    if (isFormValid) {
      createUser({
        color,
        email,
        password,
        username,
        onUserCreated: () => setEmailSent(true),
        onError: (error: string) => setServerError(error),
        setIsLoading,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const goToLogin = () => history.push("/login");

  return (
    <>
      {isLoading && (
        <PageLoadingSpinner />
      )}
      {!isLoading && serverError && serverError !== "Email taken" && (
        <ErrorDisplay />
      )}
      {!isLoading && !serverError && emailSent && (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <MoodHappyIcon color="primary" sx={{ fontSize: 80 }} />
          </Grid>
          <Grid item>
            <Typography textAlign="center">
              Success! Your account has been created and an activation link was sent, please check your email to activate your account.
            </Typography>
          </Grid>
          <Grid item>
            <SiteLink text="Login" to="/login" />
          </Grid>
        </Grid>
      )}
      {!isLoading && !emailSent && (serverError === "Email taken" || !serverError) && (
        <form noValidate onSubmit={handleFormSubmit}>
          <Grid container direction="column" spacing={6}>
            <Grid container item direction="column" spacing={4}>
              {serverError && (
                <Grid item>
                  <Typography variant="body2">
                    <Alert severity="error">
                      <Typography variant="body2">
                        {"Email is already associated with an account. Please try a different email or "}
                        <Link className={loginLink} to="/login">login</Link>
                        {" to your existing account."}
                      </Typography>
                    </Alert>
                  </Typography>
                </Grid>
              )}
              <FullWidthGridItemInput
                formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
                outerEndAdornmentIcon={PersonIcon}
                input={username}
                inputProps={{ maxLength: 25 }}
                outlinedInputProps={{ id: "username" }}
                inputLabel="Username"
                setInputState={setUsername}
                error={errors.username}
                onInputChange={clearErrorFields}
              />

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

              <Grid container item direction="column" spacing={2}>
                <Grid item>
                  <InputLabel required>Pick Your Color</InputLabel>
                </Grid>
                <Grid item>
                  <MeepleColorPicker color={color} setColor={setColor} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <ActionButtons
                formButtons
                onSave={handleSubmit}
                saveText="Create User"
                onCancel={goToLogin}
                cancelText="Cancel"
                disabled={isLoading}
                saveButtonSize={4}
                cancelButtonSize={3}
              />
            </Grid>

            <Grid container item justifyContent="center" spacing={1}>
              <Grid item>
                <Typography>
                  Already have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <SiteLink to="/login" text="Login" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
