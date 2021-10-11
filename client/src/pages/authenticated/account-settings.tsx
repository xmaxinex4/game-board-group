import React, { useContext } from "react";

import { Typography } from "@mui/material";
import { ActiveUserContext } from "../../contexts/active-user-context";

export function AccountSettings(): React.ReactElement {
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <Typography>
      {
        activeUser?.username
      }
      Account Settings
    </Typography>
  );
}
