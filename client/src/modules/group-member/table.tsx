import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";

import CircleIcon from "@mui/icons-material/Circle";
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
import { selectActiveUser } from "../../redux/active-user-slice";
import { UserMembershipResponse } from "../../../../src/types/types";

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function ActiveGroupMembershipTable(): React.ReactElement {
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeUser = useSelector(selectActiveUser);
  const { meeple } = useStyles();

  const activeGroupMemberships = useMemo(
    () => {
      if (activeUserGroupMembership && activeUserGroupMembership.group?.members?.length > 0) {
        if (activeUserGroupMembership.group?.members as UserMembershipResponse[]) {
          const members = activeUserGroupMembership.group?.members;
          const activeMember = members.filter((member) => member.user.id === activeUser?.id);
          const membersNoActiveMember = members.filter((member) => member.user.id !== activeUser?.id);
          const sortedGroupMembers = sortBy(membersNoActiveMember, (member) => member.user.username);

          return activeMember.concat(sortedGroupMembers);
        }
        return [];
      }

      return [];
    },
    [activeUserGroupMembership],
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="group members table">
        <TableBody>
          {activeGroupMemberships.map((membership) => (
            <TableRow
              key={`user-circle-display-user-id-${membership.user.id}`}
            >
              <TableCell component="th" scope="row">
                <Grid container alignItems="center" spacing={2}>
                  <Grid
                    item
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  >
                    <Avatar className={meeple}>
                      <Meeple size="icon" fill={MeeplePaletteColors[membership.user.color].main} />
                    </Avatar>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: {
                        xs: "block",
                        md: "none",
                      },
                    }}
                  >
                    <CircleIcon sx={{ color: MeeplePaletteColors[membership.user.color].main }} />
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
