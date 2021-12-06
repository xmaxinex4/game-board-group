/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import {
  Grid,
  Button,
  ButtonProps,
  GridSize,
} from "@mui/material";

export interface FormProps {
  saveText?: string;
  onSave?: () => void;
  saveButtonProps?: ButtonProps;
  cancelText?: string;
  onCancel: () => void;
  cancelButtonProps?: ButtonProps;
  disabled?: boolean;
  formButtons?: boolean;
  saveButtonSize?: boolean | GridSize;
  cancelButtonSize?: boolean | GridSize;
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
    saveButtonSize,
    cancelButtonSize,
  } = props;

  const onHandleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const onHandleCancel = () => {
    onCancel();
  };

  return (
    <Grid container justifyContent="right" spacing={2}>
      <Grid item xs={12} sm={cancelButtonSize || 3}>
        <Button disabled={disabled} fullWidth variant="outlined" onClick={onHandleCancel} {...cancelButtonProps}>
          {cancelText || "Cancel"}
        </Button>
      </Grid>
      {!!onSave && (
        <Grid item xs={12} sm={saveButtonSize || 3}>
          <Button
            fullWidth
            type={formButtons ? "submit" : "button"}
            disabled={disabled}
            variant="contained"
            onClick={formButtons ? undefined : onHandleSave}
            {...saveButtonProps}
          >
            {saveText || "Save"}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
