import React from "react";

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

import { MembershipResponse } from "../../api-types/response-types";
import { Meeple } from "../../images/components/meeple";
import { MeeplePaletteColors } from "../../theme/meeple-palettes";

const useStyles = makeStyles(() => ({
  meeple: {
    backgroundColor: "inherit",
  },
}));

export interface GroupManagementUserListDisplayProps {
  memberships: MembershipResponse[];
}

export function GroupManagementUserListDisplay(props: GroupManagementUserListDisplayProps): React.ReactElement {
  const { memberships } = props;

  const { meeple } = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: {
              xs: 300,
              sm: 500,
              md: 600,
              lg: 800,
            },
          }}
          aria-label="user table"
        >
          <TableBody>
            {memberships.map((membership) => (
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
    </Grid>
  );
}
