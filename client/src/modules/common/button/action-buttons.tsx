/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import { Grid, Button, ButtonProps } from "@mui/material";

export interface FormProps {
  saveText?: string;
  onSave: () => void;
  saveButtonProps?: ButtonProps;
  cancelText?: string;
  onCancel: () => void;
  cancelButtonProps?: ButtonProps;
  disabled?: boolean;
  formButtons?: boolean;
}

export function ActionButtons(props: FormProps): React.ReactElement {
  const {
    saveText,
    onSave,
    saveButtonProps,
    cancelText,
    onCancel,
    cancelButtonProps,
    disabled,
    formButtons,
  } = props;

  const onHandleSave = () => {
    onSave();
  };

  const onHandleCancel = () => {
    onCancel();
  };

  return (
    <Grid container justifyContent="right" spacing={2}>
      <Grid item xs={12} sm={4}>
        <Button disabled={disabled} fullWidth variant="outlined" onClick={onHandleCancel} {...cancelButtonProps}>
          {cancelText || "Cancel"}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          type={formButtons ? "submit" : "button"}
          disabled={disabled}
          variant="contained"
          onClick={onHandleSave}
          {...saveButtonProps}
        >
          {saveText || "Save"}
        </Button>
      </Grid>
    </Grid>
  );
}
