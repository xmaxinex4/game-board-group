import React, { useState, useCallback } from "react";

import { makeStyles } from "@mui/styles";
import { Theme, Skeleton } from "@mui/material";

export type ImageDimensions = { width: string; height: string; };

const useStyles = makeStyles<Theme, { imgIsLoading: boolean; imageDimensions?: ImageDimensions; }>(() => ({
  skeleton: ({ imageDimensions }) => ({
    width: imageDimensions?.width ?? 0,
    height: imageDimensions?.height ?? 0,
    objectFit: "cover",
  }),
  image: ({ imgIsLoading, imageDimensions }) => ({
    width: imageDimensions?.width ?? 0,
    height: imageDimensions?.height ?? 0,
    display: imgIsLoading ? "none" : "block",
    objectFit: "cover",
  }),
}));

export interface ImageLoaderProps {
  imageDimensions: ImageDimensions;
  imgSrc: string;
}

export function ImageLoader(props: ImageLoaderProps): React.ReactElement {
  const { imageDimensions, imgSrc } = props;

  const [imgIsLoading, setImgIsLoading] = useState(true);
  const onLoad = useCallback(() => setImgIsLoading(false), [setImgIsLoading]);

  const { image, skeleton } = useStyles({ imgIsLoading, imageDimensions });

  return (
    <>
      {imgIsLoading && (
        <Skeleton component="div" className={skeleton} variant="rectangular" />
      )}
      <img className={image} onLoad={onLoad} src={imgSrc} alt="" />
    </>
  );
}
