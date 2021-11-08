import React from "react";

import KeyboardUpIcon from "@mui/icons-material//KeyboardArrowUpTwoTone";

import {
  Box,
  useScrollTrigger,
  Zoom,
  Fab,
} from "@mui/material";

export function ScrollToTopButton(): React.ReactElement {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 120, right: 24 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
