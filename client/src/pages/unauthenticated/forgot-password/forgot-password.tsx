import React, { useState } from "react";

import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import MoodHappyIcon from "@mui/icons-material/MoodTwoTone";

import { useSendForgotPasswordEmail } from "./endpoint-hooks";
import { validateEmail } from "../../../modules/account/email-validator";
import { PageLoadingSpinner } from "../../../modules/common/progress/page-loading-spinner";
import { FullWidthGridItemInput } from "../../../modules/common/input/full-width-grid-item-input";
import { SiteLink } from "../../../modules/common/navigation/site-link";

export function ForgotPassword(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ email: string; }>({
    email: "",
  });

  const { sendForgotPasswordEmail } = useSendForgotPasswordEmail();

  const clearErrorFields = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = validateEmail(email, setErrors);

    if (isFormValid) {
      sendForgotPasswordEmail({
        email,
        onEmailSent: () => setEmailSent(true),
        setIsLoading,
      });
    }
  };

  return (
    <>
      {isLoading && (
        <PageLoadingSpinner />
      )}
      {!isLoading && emailSent && (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <MoodHappyIcon color="primary" sx={{ fontSize: 80 }} />
          </Grid>
          <Grid item>
            <Typography>
              A reset password link was sent to your email. Please check your inbox.
            </Typography>
          </Grid>
        </Grid>
      )}
      {!isLoading && !emailSent && (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={8}>
            <Grid container item direction="column" spacing={4}>
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

              <Grid container item alignItems="stretch">
                <Button fullWidth variant="contained" color="primary" disabled={isLoading} type="submit">Request Reset Link</Button>
              </Grid>
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
        </form>
      )}
    </>
  );
}
