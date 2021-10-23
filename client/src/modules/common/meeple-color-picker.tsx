/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";
import { CirclePicker, ColorResult } from "react-color";

import CircleIcon from "@mui/icons-material/Circle";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";
import {
  getMappedHexToPaletteColor,
  MeepleColorStringArray,
  MeeplePaletteColors,
  MeeplePaletteColorTheme,
} from "../../theme/meeple-palettes";

interface MeepleColorPickerProps {
  color: keyof MeeplePaletteColorTheme;
  setColor: (newColor: keyof MeeplePaletteColorTheme) => void;
}

const useStyles = makeStyles({
  circlePicker: {
    maxWidth: "355px", // width of 8 color icon (42x42) row
    minWidth: "275px", // width of 5 color icon (42x42) row
  },
});

export function MeepleColorPicker(props: MeepleColorPickerProps): React.ReactElement {
  const { color, setColor } = props;
  const { circlePicker } = useStyles();

  const onColorChange = useCallback((colorResult: ColorResult) => {
    setColor(getMappedHexToPaletteColor(colorResult.hex));
  }, [setColor]);

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Meeple fill={MeeplePaletteColors[color].main} />
      </Grid>
      <Grid
        item
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <CircleIcon sx={{ color: MeeplePaletteColors[color].main, fontSize: 96 }} />
      </Grid>
      <Grid item className={circlePicker}>
        <CirclePicker
          width="100px"
          className={circlePicker}
          color={MeeplePaletteColors[color].main}
          colors={MeepleColorStringArray}
          onChangeComplete={onColorChange}
        />
      </Grid>
    </Grid>
  );
}
