/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import LockIcon from "@mui/icons-material/Lock";
import EyeOpenIcon from "@mui/icons-material/Visibility";
import EyeClosedIcon from "@mui/icons-material/VisibilityOff";

import { FullWidthGridItemInput, FullWidthGridItemInputProps } from "./full-width-grid-item-input";

export interface FullWidthGridItemPasswordInputProps
  extends Omit<FullWidthGridItemInputProps, "outerEndAdornmentIcon" | "inputProps" | "innerEndAdornmentIconButton" | "innerEndAdornmentOnClick"> {
  fullWidthGridItemInputId?: string;
  showPasswordOverrideControl?: {
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export function FullWidthGridItemPasswordInput(props: FullWidthGridItemPasswordInputProps): React.ReactElement {
  const {
    fullWidthGridItemInputId,
    inputLabel,
    showPasswordOverrideControl,
    ...gridItemProps
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordControl = showPasswordOverrideControl || { showPassword, setShowPassword };

  const toggleShowPassword = () => {
    showPasswordControl.setShowPassword(!showPasswordControl.showPassword);
  };

  return (
    <FullWidthGridItemInput
      {...gridItemProps}
      innerEndAdornmentIconButton={showPasswordControl.showPassword ? EyeClosedIcon : EyeOpenIcon}
      innerEndAdornmentOnClick={toggleShowPassword}
      outerEndAdornmentIcon={LockIcon}
      inputLabel={inputLabel || "Password"}
      inputProps={{ maxLength: 50 }}
      outlinedInputProps={{ type: showPasswordControl.showPassword ? "text" : "password", id: fullWidthGridItemInputId || "password" }}
    />
  );
}
