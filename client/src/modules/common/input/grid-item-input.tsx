import React from "react";

import { FormControl, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

import { GridTypeMap } from "@mui/material/Grid";
import { FormControlProps } from "@mui/material/FormControl";
import { InputProps } from "@mui/material/Input";
import { SvgIconProps } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";

export interface GridItemInputProps {
  innerEndAdornmentIconButton?: ((props: SvgIconProps) => JSX.Element);
  innerEndAdornmentOnClick?: () => void;
  outerEndAdornmentIcon?: ((props: SvgIconProps) => JSX.Element);
  formControlProps?: FormControlProps;
  error?: string;
  gridItemProps?: Omit<GridTypeMap<{}, "div">, "alignItems">;
  input: String;
  inputLabel?: string;
  inputProps?: InputProps;
  onInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onRightAction?: (e: React.MouseEvent) => void;
  rightActionIcon?: any; // TODO: Fix typing
  setInputState: (input: string) => void;
}

export function GridItemInput(props: GridItemInputProps): React.ReactElement {
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
    onRightAction,
    rightActionIcon: RightActionIcon,
    setInputState,
  } = props;

  // const labelWidth = inputLabel ? inputLabel.length * 10 : 0;

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

  return (
    <Grid container alignItems="center" {...gridItemProps}>
      <Grid item>
        <FormControl {...formControlProps}>
          {inputLabel &&
            <InputLabel error={error ? true : false} variant="outlined">{inputLabel}</InputLabel>
          }
          <OutlinedInput
            error={error ? true : false}
            label={inputLabel}
            // labelWidth={labelWidth}
            value={input}
            onChange={onChange}
            {...inputProps}
            onFocus={onFocus}
            onBlur={onBlur}
            endAdornment={
              <>
                {InnerEndAdornmentIconButton &&
                  <InputAdornment position="end">
                    <IconButton onClick={innerEndAdornmentOnClick}><InnerEndAdornmentIconButton /></IconButton>
                  </InputAdornment>
                }
                {OuterEndAdornmentIcon &&
                  <InputAdornment position="end">
                    <OuterEndAdornmentIcon color={error ? "error" : focused ? "primary" : "inherit"} />
                  </InputAdornment>
                }
              </>
            } />
          {error &&
            <FormHelperText error>{error}</FormHelperText>
          }
        </FormControl>
      </Grid>
      {onRightAction && RightActionIcon &&
        <Grid item>
          <IconButton onClick={onRightAction} color="primary" component="span">
            <RightActionIcon />
          </IconButton>
        </Grid>
      }
    </Grid>
  );
}
