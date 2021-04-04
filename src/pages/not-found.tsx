import * as React from 'react'

import { Backsplash } from '../Common/Backsplash';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px"
  },

  span: {
    paddingTop: "200px",
    paddingBottom: "50px"
  }
});

export const NotFound: React.FunctionComponent = () => {
  const classes = useStyles({});

  return (
    <Backsplash>
      <div className={classes.span}>
        <Typography>Not Found</Typography>
      </div>
    </Backsplash>
  )
}