import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

import EmailIcon from "@mui/icons-material/Email";
import MoodHappyIcon from "@mui/icons-material/MoodTwoTone";

import { Grid, Typography } from "@mui/material";

import { FullWidthGridItemInput } from "../../../modules/common/input/full-width-grid-item-input";
import { ActionButtons } from "../../../modules/common/button/action-buttons";
import { validateEmail } from "../../../modules/account/email-validator";

import { useResendActivationEmail } from "./endpoint-hooks";
import { SiteLink } from "../../../modules/common/navigation/site-link";

export interface ResendActivationFormProps {
  onCancel?: () => void;
  onSend?: () => void;
}

export function ResendActivationForm(props: ResendActivationFormProps): React.ReactElement {
  const history = useHistory();

  const { onCancel, onSend } = props;
  const { resendActivationEmail } = useResendActivationEmail();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [emailSent, setEmailSent] = useState(false);

  const onResendActivationCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    } else {
      history.push("/login");
    }
  }, [onCancel]);

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
        onActivationEmailSent: () => {
          setEmailSent(true);
          if (onSend) {
            onSend();
          }
        },
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
      <Grid container item direction="column" spacing={2}>
        {emailSent && (
          <Grid container item direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <MoodHappyIcon color="primary" sx={{ fontSize: 80 }} />
            </Grid>
            <Grid item>
              <Typography textAlign="center">
                Thank you! An activation link was sent, please check your email to confirm.
              </Typography>
            </Grid>
            <Grid item>
              <SiteLink text="Login" to="/" />
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
                saveText="Send"
                onCancel={onResendActivationCancel}
                cancelText="Cancel"
                disabled={isLoading}
              />
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}
