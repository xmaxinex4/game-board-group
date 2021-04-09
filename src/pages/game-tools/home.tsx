import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import valeriaMain from "./images/valeria-card-kingdoms-main.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 500,
  },
  cardMedia: {
    height: 140,
  },
}));

type GameTool = {
  title: string;
  description: string;
  imgSrc: string;
  appLink: string;
};

export function GameToolsHome(): React.ReactElement {
  const { root, card, cardMedia } = useStyles();

  const gameTools: GameTool[] = [
    {
      title: "Valeria Card Kingdoms Randomizer",
      description: "A card randomizer for Valeria Card Kingdoms",
      imgSrc: valeriaMain,
      appLink: "/game-tools/valeria-card-kingdoms-randomizer",
    },
  ];

  // TODO: Put in a "<- Back to GameBoardGroup" button

  return (
    <div className={root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        {/* <Grid container justify="center" alignItems="center" item xs={8}>
          <Grid item>
            <MeepleCircle />
          </Grid>
          <Grid item>
            <Typography variant="h6">Various Board Game Tools are available for free!</Typography>
          </Grid>
        </Grid> */}

        <Grid container item xs={8} spacing={2}>
          {
            gameTools.map((tool) => (
              <Grid item xs={6}>
                <Card className={card}>
                  <Link to={tool.appLink} component={CardActionArea}>
                    <CardMedia
                      className={cardMedia}
                      image={tool.imgSrc}
                      title={tool.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {tool.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {tool.description}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </div>
  );
}
