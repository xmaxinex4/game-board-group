import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import Shield from "@mui/icons-material/ShieldTwoTone";
import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function ActiveGroupMembershipTable(): React.ReactElement {
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const { meeple } = useStyles();

  const activeGroupMemberships = useMemo(
    () => {
      if (activeUserGroupMembership && activeUserGroupMembership.group?.members?.length > 0) {
        return activeUserGroupMembership.group?.members;
      }

      return [];
    },
    [activeUserGroupMembership],
  );

  return (
    <TableContainer sx={{ maxWidth: 800, margin: "auto" }} component={Paper}>
      <Table
        sx={{
          minWidth: {
            xs: 275,
            sm: 500,
            md: 600,
          },
        }}
        aria-label="user table"
      >
        <TableBody>
          {activeGroupMemberships.map((membership) => (
            <TableRow
              key={`user-circle-display-user-id-${membership.user.id}`}
            >
              <TableCell component="th" scope="row">
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar className={meeple}>
                      <Meeple size="icon" fill={MeeplePaletteColors[membership.user.color].main} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography>{membership.user.username}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="right">
                {membership.isAdmin && (
                  <Tooltip title="Admin" aria-label="admin">
                    <Shield sx={{ color: MeeplePaletteColors[membership.user.color].main }} />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
