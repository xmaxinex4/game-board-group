import * as React from "react"
// import { useMutation } from "react-apollo";
// import { ApolloError } from "apollo-boost";

import { Button, Grid, InputLabel, Typography } from "@material-ui/core"

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";

import { PaletteColors } from "../../../Theme";
import { LOGIN } from "../../../Common/Login";
import { FullWidthGridItemInput, FullWidthGridItemPasswordInput, MeepleColorPicker } from "../../../Common/Form";
import { SiteLink } from "../../../common/navigation";

import { CREATE_USER } from "../Mutations";
import { CreateUserErrorFormModel, validateCreateUserForm } from "../Validators";

export interface CreateUserFormModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  color: string;
}

export const CreateUserForm: React.FunctionComponent = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [color, setColor] = React.useState(PaletteColors.Red.main);
  const [handlingSubmit, setHandlingSubmit] = React.useState(false);

  const [errors, setErrors] = React.useState<CreateUserErrorFormModel>({ username: "", email: "", password: "", confirmPassword: "", color: "" });

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const onCreateUserError = (error: ApolloError) => {
    // TODO: show errors in ui
    console.log("create account error: ", error);
  };

  const onCreateUserCompleted = (data: any) => {
    login({ variables: { email, password } });
  };

  const onLoginError = (error: ApolloError) => {
    // TODO: handle error case
    console.log("login error: ", error);
  };

  const onLoginCompleted = (data: any) => {
    // TODO: route user to home page and Alert/Welcome user their account has been created
    localStorage.setItem("auth-token", data.login.token);
    window.location.href = "/";
  };

  const [createUser, createUserResults] = useMutation(CREATE_USER, { onError: onCreateUserError, onCompleted: onCreateUserCompleted });
  const [login, loginResults] = useMutation(LOGIN, { onError: onLoginError, onCompleted: onLoginCompleted });

  const handleSubmit = (e: React.FormEvent) => {
    setHandlingSubmit(true);
    e.preventDefault();

    const formValid = validateCreateUserForm({ username, email, password, confirmPassword, color }, setErrors);

    if (formValid) {
      createUser({ variables: { color, password, email, username } });
    }

    setHandlingSubmit(false);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h5" component="h2">
            Create Account
          </Typography>
        </Grid>

        <FullWidthGridItemInput
          formControlProps={{ required: true, disabled: createUserResults.loading, fullWidth: true }}
          outerEndAdornmentIcon={PersonIcon}
          input={username}
          inputProps={{ id: "username" }}
          inputLabel="Username"
          setInputState={setUsername}
          error={errors.username}
          onInputChange={clearErrorField} />

        <FullWidthGridItemInput
          formControlProps={{ required: true, disabled: createUserResults.loading, fullWidth: true }}
          outerEndAdornmentIcon={EmailIcon}
          input={email}
          inputProps={{ id: "email" }}
          inputLabel="Email"
          setInputState={setEmail}
          error={errors.email}
          onInputChange={clearErrorField} />

        <FullWidthGridItemPasswordInput
          formControlProps={{ required: true, disabled: createUserResults.loading, fullWidth: true }}
          input={password}
          setInputState={setPassword}
          error={errors.password}
          onInputChange={clearErrorField} />

        <FullWidthGridItemPasswordInput
          formControlProps={{ required: true, disabled: createUserResults.loading, fullWidth: true }}
          input={confirmPassword}
          FullWidthGridItemInputId="confirmPassword"
          inputLabel="Confirm Password"
          setInputState={setConfirmPassword}
          error={errors.confirmPassword}
          onInputChange={clearErrorField} />

        <Grid container item direction="column" spacing={4}>
          <Grid item>
            <InputLabel required>Pick Your Color</InputLabel>
          </Grid>
          <Grid item>
            <MeepleColorPicker color={color} setColor={setColor} />
          </Grid>
        </Grid>

        <Grid container item alignItems="stretch">
          <Button fullWidth variant="contained" color="primary" disabled={handlingSubmit} type="submit">Create User</Button>
        </Grid>

        <Grid container item justify="center">
          <Typography>
            Already have an account? <SiteLink to="/login" text="Login" />
          </Typography>
        </Grid>
      </Grid>
    </form >
  )
}