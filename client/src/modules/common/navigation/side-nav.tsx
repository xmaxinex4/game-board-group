import React from "react";
import { Link } from "react-router-dom";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// import { HexIcon } from "../../../images/components/hex";

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
}));

export function SideNav(): React.ReactElement {
  const { tabs, root } = useStyles({});
  const [currentTab, setCurrentTab] = React.useState(0);

  const onTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  // import HowToVoteIcon from '@mui/icons-material/HowToVote'; // for Polls
  // import PieChartIcon from '@mui/icons-material/PieChart'; // for Stats
  // import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // for Library
  // Meeple Group for manage group

  return (
    <div className={root}>
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={onTabChange}
        className={tabs}
      >
        <Tab component={Link} label="Polls" to="/polls" />
        <Tab component={Link} label="Stats" to="/stats" />
        <Tab component={Link} label="Library" to="/library" />
        <Tab component={Link} label="Manage Group" to="/manage-group" />
      </Tabs>
    </div>
  );
}
