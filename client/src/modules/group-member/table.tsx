import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { sortBy } from "lodash";

import CircleIcon from "@mui/icons-material/Circle";
import AdminIcon from "@mui/icons-material/ShieldTwoTone";
import OwnerIcon from "@mui/icons-material/FlagTwoTone";

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
  Theme,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Meeple } from "../../images/components/meeple";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";
import { selectedActiveUserGroupMembership } from "../../redux/active-user-group-memberships-slice";
import { selectActiveUser } from "../../redux/active-user-slice";
import { UserMembershipResponse } from "../../../../src/types/types";
import { AdminGroupMemberSwitch } from "./edit/admin-group-member-switch";
import { DeleteMemberButton } from "./delete/delete-member-button";
import { LeaveGroupButton } from "./delete/leave-group-button";
import { TransferActiveGroupOwnershipButton } from "./transfer-ownership/transfer-active-group-ownership-button";

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export function ActiveGroupMembershipTable(): React.ReactElement {
  const activeUserGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const activeUser = useSelector(selectActiveUser);

  const theme = useTheme<Theme>();
  const isXsDown = useMediaQuery(theme.breakpoints.down("sm"));

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
    [activeUserGroupMembership, activeUser],
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
              <TableCell>
                <Grid container direction={isXsDown ? "column" : "row"} alignItems={isXsDown ? "flex-end" : "center"} justifyContent="flex-end">
                  {activeUserGroupMembership?.isAdmin && (
                    <>
                      {activeUserGroupMembership?.group?.ownedByUser.id === membership?.user?.id && (
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item>
                              <Tooltip title="Owner" aria-label="owner">
                                <OwnerIcon
                                  sx={{
                                    paddingRight: activeUser?.id === membership.user.id ? "" : "8px",
                                    color: MeeplePaletteColors[membership.user.color].main,
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                            {activeUser?.id === membership.user.id && (
                              <Grid item>
                                <TransferActiveGroupOwnershipButton currentOwnerGroupMembership={membership} />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                      {activeUserGroupMembership?.group?.ownedByUser.id !== membership?.user?.id && (
                        <>
                          <Grid item>
                            <AdminGroupMemberSwitch membership={membership} activeGroupMemberships={activeGroupMemberships} />
                          </Grid>
                          {activeUser && membership.user.id !== activeUser.id && (
                            <Grid item>
                              <DeleteMemberButton membership={membership} activeGroupMemberships={activeGroupMemberships} />
                            </Grid>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {!activeUserGroupMembership?.isAdmin && (
                    <Grid item>
                      {activeUserGroupMembership?.group?.ownedByUser.id === membership?.user?.id
                        ? (
                          <Tooltip title="Owner" aria-label="owner">
                            <OwnerIcon sx={{ paddingRight: "8px", color: MeeplePaletteColors[membership.user.color].main }} />
                          </Tooltip>
                        )
                        : membership.isAdmin && (
                          <Tooltip title="Admin" aria-label="admin">
                            <AdminIcon sx={{ color: MeeplePaletteColors[membership.user.color].main }} />
                          </Tooltip>
                        )}
                    </Grid>
                  )}
                  {activeUser && membership.user.id === activeUser.id && activeUserGroupMembership?.group?.ownedByUser.id !== activeUser?.id && (
                    <Grid item>
                      <LeaveGroupButton membership={membership} activeGroupMemberships={activeGroupMemberships} />
                    </Grid>
                  )}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
