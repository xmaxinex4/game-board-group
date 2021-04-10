/* eslint-disable no-unused-vars */

import React, { useCallback } from "react";
import { CirclePicker, ColorResult } from "react-color";

import { Grid, makeStyles } from "@material-ui/core";

import { Meeple } from "../../images/components/meeple";
import { MeepleColorStringArray } from "../../theme/meeple-palettes";

interface MeepleColorPickerProps {
  color: string;
  setColor: (newColor: string) => void;
}

const useStyles = makeStyles({
  gridHeight: {
    height: "250px",
  },
});

export function MeepleColorPicker(props: MeepleColorPickerProps): React.ReactElement {
  const { color, setColor } = props;
  const classes = useStyles({});

  const onColorChange = useCallback((colorResult: ColorResult) => {
    setColor(colorResult.hex);
  }, [setColor]);

  return (
    <Grid container className={classes.gridHeight} direction="column" alignItems="center" justify="space-between">
      <Grid item>
        <Meeple fill={color} />
      </Grid>
      <Grid item>
        <CirclePicker
          width="350px"
          color={color}
          colors={MeepleColorStringArray}
          onChangeComplete={onColorChange}
        />
      </Grid>
    </Grid>
  );
}
