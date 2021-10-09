/* eslint-disable no-unused-vars, react/jsx-props-no-spreading */

import React, { useMemo } from "react";

import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { GridTypeMap } from "@mui/material/Grid";
import { FormControlProps } from "@mui/material/FormControl";
import { InputProps } from "@mui/material/Input";
import { SvgIconProps } from "@mui/material/SvgIcon";

import IconButton from "@mui/material/IconButton";

export interface FullWidthGridItemInputProps {
  innerEndAdornmentIconButton?: ((props: SvgIconProps) => React.ReactElement);
  innerEndAdornmentOnClick?: () => void;
  outerEndAdornmentIcon?: any; // TODO: Fix typing
  formControlProps?: FormControlProps;
  error?: string;
  gridItemProps?: Omit<GridTypeMap<{}, "div">, "alignItems">;
  input: String;
  inputLabel?: string;
  inputProps?: InputProps;
  onInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  setInputState: (input: string) => void;
}

export function FullWidthGridItemInput(props: FullWidthGridItemInputProps): React.ReactElement {
  const {
    formControlProps,
    error,
    gridItemProps,
    input,
    inputLabel,
    inputProps,
    innerEndAdornmentIconButton: InnerEndAdornmentIconButton,
    innerEndAdornmentOnClick,
    outerEndAdornmentIcon: OuterEndAdornmentIcon,
    onInputChange,
    setInputState,
  } = props;

  // const labelWidth = inputLabel ? inputLabel.length * 10 : 0;
  const hasError = useMemo(() => !!error, [error]);
  const [focused, setFocused] = React.useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    setInputState(e.target.value);

    if (onInputChange) {
      onInputChange(e);
    }
  };

  const outerEndIconColor = useMemo(() => {
    if (hasError) {
      return "error";
    }

    return focused ? "primary" : "inherit";
  }, [hasError, focused]);

  return (
    <Grid container item alignItems="stretch" {...gridItemProps}>
      <FormControl {...formControlProps}>
        {
          inputLabel && <InputLabel error={!!error} variant="outlined">{inputLabel}</InputLabel>
        }
        <OutlinedInput
          error={!!error}
          // labelWidth={labelWidth}
          label={inputLabel}
          value={input}
          onChange={onChange}
          {...inputProps}
          onFocus={onFocus}
          onBlur={onBlur}
          endAdornment={(
            <>
              {
                InnerEndAdornmentIconButton && (
                  <InputAdornment position="end">
                    <IconButton onClick={innerEndAdornmentOnClick}><InnerEndAdornmentIconButton /></IconButton>
                  </InputAdornment>
                )
              }
              {
                OuterEndAdornmentIcon && (
                  <InputAdornment position="end">
                    <OuterEndAdornmentIcon color={outerEndIconColor} />
                  </InputAdornment>
                )
              }
            </>
          )}
        />
        {
          error && <FormHelperText error>{error}</FormHelperText>
        }
      </FormControl>
    </Grid>
  );
}
