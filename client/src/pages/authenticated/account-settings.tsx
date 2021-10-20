import React from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { selectActiveUser } from "../../redux/active-user-slice";

export function AccountSettings(): React.ReactElement {
  const activeUser = useSelector(selectActiveUser);

  return (
    <Typography>
      {
        activeUser?.username
      }
      Account Settings
    </Typography>
  );
}
