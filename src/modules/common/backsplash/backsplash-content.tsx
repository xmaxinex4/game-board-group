import * as React from 'react'

import { Grid } from '@material-ui/core';

export const BacksplashContent: React.FunctionComponent = ({ children }) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}