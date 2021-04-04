import * as React from 'react'
import { ActiveGroupContext, ActiveUserContext } from "../../../Contexts";
import { FormControl, InputLabel, MenuItem, Select, Typography, Button, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
// import { TextButton, FullWidthGridItemInput } from "../../Common/Form";

export const CreateGroupForm: React.FunctionComponent =
  () => {
    const { activeGroup, setActiveGroup } = React.useContext(ActiveGroupContext);
    const { activeUser } = React.useContext(ActiveUserContext);

    const onActiveGroupChanged = (event: React.ChangeEvent<{ name?: string; value: unknown; }>, child: React.ReactNode) => {
      console.log("event: ", event);
    }

    const onAddGroup = () => {
      console.log("Add Group clicked");
    }

    return (
      <></>
      // <form noValidate onSubmit={handleSubmit}>
      //   <Grid container direction="column" spacing={4}>
      //     <Grid item>
      //       <Typography variant="h5" component="h2">
      //         Create Account
      //     </Typography>
      //     </Grid>

      //     <FullWidthGridItemInput
      //       formControlProps={{ required: true, disabled: createAccountResults.loading }}
      //       outerEndAdornmentIcon={PersonIcon}
      //       input={username}
      //       inputProps={{ id: "username" }}
      //       inputLabel="Username"
      //       setInputState={setUsername}
      //       error={errors.username}
      //       onInputChange={clearErrorField} />

      //     <FullWidthGridItemInput
      //       formControlProps={{ required: true, disabled: createAccountResults.loading }}
      //       outerEndAdornmentIcon={EmailIcon}
      //       input={email}
      //       inputProps={{ id: "email" }}
      //       inputLabel="Email"
      //       setInputState={setEmail}
      //       error={errors.email}
      //       onInputChange={clearErrorField} />

      //     <FullWidthGridItemPasswordInput
      //       formControlProps={{ required: true, disabled: createAccountResults.loading }}
      //       input={password}
      //       setInputState={setPassword}
      //       error={errors.password}
      //       onInputChange={clearErrorField} />

      //     <FullWidthGridItemPasswordInput
      //       formControlProps={{ required: true, disabled: createAccountResults.loading }}
      //       input={confirmPassword}
      //       FullWidthGridItemInputId="confirmPassword"
      //       inputLabel="Confirm Password"
      //       setInputState={setConfirmPassword}
      //       error={errors.confirmPassword}
      //       onInputChange={clearErrorField} />

      //     <Grid container item direction="column" spacing={4}>
      //       <Grid item>
      //         <InputLabel required>Pick Your Color</InputLabel>
      //       </Grid>
      //       <Grid item>
      //         <MeepleColorPicker color={color} setColor={setColor} />
      //       </Grid>
      //     </Grid>

      //     <Grid container item alignItems="stretch">
      //       <Button fullWidth variant="contained" color="primary" disabled={createAccountResults.loading} type="submit">Create Account</Button>
      //     </Grid>

      //     <Grid container item justify="center">
      //       <Typography>
      //         Already have an account? <SiteLink to="/login" text="Login" />
      //       </Typography>
      //     </Grid>
      //   </Grid>
      // </form >
    )
  }