import React, { useState } from "react";
import { useHistory } from "react-router";

import {
  Grid,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import MoodHappyIcon from "@mui/icons-material/MoodTwoTone";

import { useSendForgotPasswordEmail } from "./endpoint-hooks";
import { validateEmail } from "../../../modules/account/email-validator";
import { PageLoadingSpinner } from "../../../modules/common/progress/page-loading-spinner";
import { FullWidthGridItemInput } from "../../../modules/common/input/full-width-grid-item-input";
import { ActionButtons } from "../../../modules/common/button/action-buttons";
import { SiteLink } from "../../../modules/common/navigation/site-link";

export function ForgotPassword(): React.ReactElement {
  const history = useHistory();

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

  const handleSubmit = () => {
    const isFormValid = validateEmail(email, setErrors);

    if (isFormValid) {
      sendForgotPasswordEmail({
        email,
        onEmailSent: () => setEmailSent(true),
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
      {!isLoading && emailSent && (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <MoodHappyIcon color="primary" sx={{ fontSize: 80 }} />
          </Grid>
          <Grid item>
            <Typography textAlign="center">
              Success! A reset password link was sent to your email. Please check your inbox.
            </Typography>
          </Grid>
          <Grid item>
            <SiteLink text="Back to Login" to="/login" />
          </Grid>
        </Grid>
      )}
      {!isLoading && !emailSent && (
        <form noValidate onSubmit={handleFormSubmit}>
          <Grid container direction="column" spacing={8}>
            <Grid container item direction="column" spacing={4}>
              <Grid item>
                <Typography textAlign="center">
                  Enter your email and we&apos;ll send you a link to reset your password.
                </Typography>
              </Grid>
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
                  saveText="Reset Password"
                  onCancel={goToLogin}
                  cancelText="Cancel"
                  disabled={isLoading}
                  saveButtonSize={5}
                  cancelButtonSize={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
