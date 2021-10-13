import React from "react";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { selectActiveUser } from "../../modules/user/redux/slice";

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
