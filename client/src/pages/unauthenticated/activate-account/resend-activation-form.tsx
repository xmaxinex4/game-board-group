import React, { useState } from "react";
import { useHistory } from "react-router";

import EmailIcon from "@mui/icons-material/Email";
import MoodHappyIcon from "@mui/icons-material/MoodTwoTone";

import { Grid, Typography } from "@mui/material";

import { FullWidthGridItemInput } from "../../../modules/common/input/full-width-grid-item-input";
import { ActionButtons } from "../../../modules/common/button/action-buttons";
import { validateEmail } from "../../../modules/account/email-validator";

import { useResendActivationEmail } from "./endpoint-hooks";

export function ResendActivationForm(): React.ReactElement {
  const history = useHistory();

  const { resendActivationEmail } = useResendActivationEmail();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [emailSent, setEmailSent] = useState(false);

  const goToLogin = () => history.push("/login");

  const clearErrorFields = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  // check for valid email
  const handleSubmit = () => {
    const isFormValid = validateEmail(email, setErrors);

    // resend verify account email
    if (isFormValid) {
      resendActivationEmail({
        email,
        setIsLoading,
        onActivationEmailSent: () => setEmailSent(true),
        onError: () => setEmailSent(true), // set true even on error for security to not reveal extra info to the user
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container item direction="column" spacing={8}>
        {emailSent && (
          <Grid container item direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <MoodHappyIcon color="primary" sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item>
              <Typography>
                Thank you! An activation link was sent, please check your email to confirm.
              </Typography>
            </Grid>
          </Grid>
        )}
        {!emailSent && (
          <>
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
          </>
        )}
      </Grid>
    </form>
  );
}
