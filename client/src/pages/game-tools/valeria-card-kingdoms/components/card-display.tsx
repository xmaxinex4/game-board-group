import React from "react";

import useResizeObserver from "@react-hook/resize-observer";

import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";

import { ImageLoader } from "../../../../modules/common/image/image-loader";

export interface ValeriaCardKingdomsCardProps {
  title: string;
  imgSrc: string;
}

export function ValeriaCardKingdomsCardDisplay(props: ValeriaCardKingdomsCardProps): React.ReactElement {
  const { title, imgSrc } = props;

  const gridContainerRef = React.useRef(null);
  const [imageDimensions, setImageDimensions] = React.useState<{ height: number, width: number; }>({ height: 0, width: 0 });
  useResizeObserver(gridContainerRef, (entry) => setImageDimensions({ height: (1.4) * entry.contentRect.width, width: entry.contentRect.width }));

  return (
    <Grid container direction="column" justify="flex-end" alignItems="center" ref={gridContainerRef}>
      <Grid item>
        <Typography variant="caption">
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
      </Grid>
      <Grid item>
        <ImageLoader imgSrc={imgSrc} imageDimensions={imageDimensions} />
      </Grid>
    </Grid>
  );
}
