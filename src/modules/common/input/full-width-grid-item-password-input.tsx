import * as React from 'react'

import LockIcon from "@material-ui/icons/Lock";
import EyeOpenIcon from "@material-ui/icons/Visibility";
import EyeClosedIcon from "@material-ui/icons/VisibilityOff";

import { FullWidthGridItemInput, IFullWidthGridItemInputProps } from "./full-width-grid-item-input";

export interface IFullWidthGridItemPasswordInputProps extends Omit<IFullWidthGridItemInputProps, "outerEndAdornmentIcon" | "inputProps" | "innerEndAdornmentIconButton" | "innerEndAdornmentOnClick"> {
  FullWidthGridItemInputId?: string
}

export const FullWidthGridItemPasswordInput: React.FunctionComponent<IFullWidthGridItemPasswordInputProps> =
  ({ FullWidthGridItemInputId, inputLabel, ...gridItemProps }) => {
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
        inputProps={{ type: showPassword ? "text" : "password", id: FullWidthGridItemInputId || "password" }} />
    )
  }