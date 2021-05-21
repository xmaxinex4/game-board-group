import React from "react";

import useResizeObserver from "@react-hook/resize-observer";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { ImageLoader } from "../../../../modules/common/image/image-loader";

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%",
  },
}));

export interface ValeriaCardKingdomsCardProps {
  title: string;
  imgSrc: string;
}

export function ValeriaCardKingdomsCardDisplay(props: ValeriaCardKingdomsCardProps): React.ReactElement {
  const { title, imgSrc } = props;
  const { fullWidth } = useStyles({});

  const gridContainerRef = React.useRef(null);
  const [imageDimensions, setImageDimensions] = React.useState<{ height: number, width: number; }>({ height: 0, width: 0 });
  useResizeObserver(gridContainerRef, (entry) => setImageDimensions({ height: (1.4) * entry.contentRect.width, width: entry.contentRect.width }));

  return (
    <Grid container direction="column" justify="flex-end" alignItems="center" ref={gridContainerRef}>
      <Grid className={fullWidth} item>
        <Typography display="block" align="center" noWrap variant="caption">
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
      </Grid>
      <Grid className={fullWidth} item>
        <ImageLoader imgSrc={imgSrc} imageDimensions={imageDimensions} />
      </Grid>
    </Grid>
  );
}
