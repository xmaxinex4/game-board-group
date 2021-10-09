import React from "react";
import { Link } from "react-router-dom";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// import { HexIcon } from "../../../images/components/hex";

const blueHex = require("../../../images/svg/HexBlue.svg");
const darkGreenHex = require("../../../images/svg/HexDarkGreen.svg");
const lightBlueHex = require("../../../images/svg/HexLightBlue.svg");
const lightGreenHex = require("../../../images/svg/HexLightGreen.svg");

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 800,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  blueTab: {
    backgroundImage: `url(${blueHex})`,
    backgroundRepeat: "no-repeat",
    height: 200,
    width: 200,
  },
  darkGreenTab: {
    backgroundImage: `url(${darkGreenHex})`,
    backgroundRepeat: "no-repeat",
    height: 200,
    width: 200,
  },
  lightBlueTab: {
    backgroundImage: `url(${lightBlueHex})`,
    backgroundRepeat: "no-repeat",
    height: 200,
    width: 200,
  },
  lightGreenTab: {
    backgroundImage: `url(${lightGreenHex})`,
    backgroundRepeat: "no-repeat",
    height: 200,
    width: 200,
  },
}));

export const SideNav: React.FunctionComponent = () => {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // const onTabClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   // event.preventDefault();
  // };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.blueTab} component={Link} label="Polls" to="/polls" />

        <Tab className={classes.darkGreenTab} component={Link} label="Stats" to="/stats" />

        <Tab className={classes.lightBlueTab} component={Link} label="Library" to="/library" />

        <Tab className={classes.lightGreenTab} component={Link} label="Manage Group" to="/manage-group" />
      </Tabs>
    </div>
  );
};
