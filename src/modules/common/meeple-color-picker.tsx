import * as React from 'react'
import { CirclePicker, ColorResult } from "react-color";

import { Grid, makeStyles } from '@material-ui/core'

import { Meeple } from "../../images/components/meeple";
import { MeepleColorStringArray } from "../../theme";

interface MeepleColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

const useStyles = makeStyles({
  gridHeight: {
    height: "250px"
  }
})

export const MeepleColorPicker: React.FunctionComponent<MeepleColorPickerProps> = (props) => {
  const classes = useStyles({});

  const setColorHandler = (color: ColorResult) => {
    props.setColor(color.hex);
  }

  return (
    <Grid container className={classes.gridHeight} direction="column" alignItems="center" justify="space-between">
      <Grid item>
        <Meeple fill={props.color} />
      </Grid>
      <Grid item>
        <CirclePicker
          width="350px"
          color={props.color}
          colors={MeepleColorStringArray}
          onChangeComplete={setColorHandler} />
      </Grid>
    </Grid>
  )
}