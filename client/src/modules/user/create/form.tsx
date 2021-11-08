import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  Button,
  Grid,
  InputLabel,
  Typography,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

import { Color } from ".prisma/client";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { FullWidthGridItemPasswordInput } from "../../common/input/full-width-grid-item-password-input";
import { MeepleColorPicker } from "../../common/meeple-color-picker";
import { SiteLink } from "../../common/navigation/site-link";
import { CreateUserFormModel } from "./model";
import { validateCreateUserForm } from "./validator";
import { useApi } from "../../../hooks/useApi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Omit<CreateUserFormModel, "color"> & { color: string; }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
  });

  const { loginLink } = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordOverrideControl = {
    showPassword,
    setShowPassword,
  };

  const clearErrorFields = (e: React.ChangeEvent) => {
    setServerError("");
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const { apiPost } = useApi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateCreateUserForm({
      username,
      email,
      password,
      confirmPassword,
      color,
    }, setErrors);

    if (isFormValid) {
      setIsLoading(true);
      apiPost<{ token: string; }>("/user/create", {
        color,
        email: email.toLowerCase(),
        password,
        username,
      })
        .then(({ data }) => {
          // TODO: Alert/Welcome user their account has been created
          localStorage.setItem("auth-token", data?.token);
          window.location.href = "/";
        })
        .catch(({ response }) => {
          const error = response?.data?.error;

          if (error) {
            setServerError(error || "Something went wrong. Please try again.");
          }

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
          {serverError && (
            <Grid item>
              <Typography variant="body2">
                <Alert severity="error">
                  {serverError === "Email taken"
                    ? (
                      <Typography variant="body2">
                        {"Email is already associated with an account. Please try a different email or "}
                        <Link className={loginLink} to="/login">login</Link>
                        {" to your existing account."}
                      </Typography>
                    )
                    : serverError}
                </Alert>
              </Typography>
            </Grid>
          )}
          <FullWidthGridItemInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            outerEndAdornmentIcon={PersonIcon}
            input={username}
            inputProps={{ maxLength: 50 }}
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

          <Grid container item alignItems="stretch">
            <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Create User</Button>
          </Grid>
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
  );
}
