import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Typography } from "@material-ui/core";

import valeriaMain from "./images/valeria-card-kingdoms-main.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

type GameTool = {
  title: string;
  description: string;
  imgSrc: string;
};

export function GameToolsHome(): React.ReactElement {
  const { root, gridList, icon } = useStyles();
  const gameTools: GameTool[] = [
    {
      title: "Valeria Card Kingdom Randomizer",
      description: "A card randomizer for Valeria Card Kingdom",
      imgSrc: valeriaMain,
    },
  ];

  return (
    <div className={root}>
      <GridList cellHeight={180} className={gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <Typography>Various Board Game Tools are available for free!</Typography>
        </GridListTile>
        {
          gameTools.map((tool) => (
            <GridListTile key={tool.imgSrc}>
              <img src={tool.imgSrc} alt={tool.title} />
              <GridListTileBar
                title={tool.title}
                subtitle={tool.description}
                actionIcon={(
                  <IconButton aria-label={`info about ${tool.title}`} className={icon}>
                    <InfoIcon />
                  </IconButton>
                )}
              />
            </GridListTile>
          ))
        }
      </GridList>
    </div>
  );
}
