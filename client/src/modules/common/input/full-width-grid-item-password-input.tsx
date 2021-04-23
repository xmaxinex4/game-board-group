/* eslint-disable react/jsx-props-no-spreading */

import React from "react";

import LockIcon from "@material-ui/icons/Lock";
import EyeOpenIcon from "@material-ui/icons/Visibility";
import EyeClosedIcon from "@material-ui/icons/VisibilityOff";

import { FullWidthGridItemInput, FullWidthGridItemInputProps } from "./full-width-grid-item-input";

export interface FullWidthGridItemPasswordInputProps
  extends Omit<FullWidthGridItemInputProps, "outerEndAdornmentIcon" | "inputProps" | "innerEndAdornmentIconButton" | "innerEndAdornmentOnClick"> {
  fullWidthGridItemInputId?: string;
}

export function FullWidthGridItemPasswordInput(props: FullWidthGridItemPasswordInputProps): React.ReactElement {
  const { fullWidthGridItemInputId, inputLabel, ...gridItemProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FullWidthGridItemInput
      {...gridItemProps}
      innerEndAdornmentIconButton={showPassword ? EyeClosedIcon : EyeOpenIcon}
      innerEndAdornmentOnClick={toggleShowPassword}
      outerEndAdornmentIcon={LockIcon}
      inputLabel={inputLabel || "Password"}
      inputProps={{ type: showPassword ? "text" : "password", id: fullWidthGridItemInputId || "password" }}
    />
  );
}
