import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  activeUserGroupMemberships,
  setSelectedActiveUserGroupMembershipId,
  selectedActiveUserGroupMembership,
} from "../../redux/active-user-group-memberships-slice";

export function ActiveGroupSelector(): React.ReactElement {
  const userGroupMemberships = useSelector(activeUserGroupMemberships);
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);
  const theme = useTheme<Theme>();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();
  const history = useHistory();

  const onAddGroup = useCallback(() => {
    history.push("/add-group");
  }, []);

  const onActiveGroupChanged = useCallback((event: any) => {
    dispatch(setSelectedActiveUserGroupMembershipId({
      id: event.target.value,
    }));
  }, []);

  return (
    <Grid
      container
      spacing={isMdUp ? 1 : 0}
      direction={isMdUp ? "row" : "column"}
      alignItems={isMdUp ? "center" : "flex-end"}
    >
      <Grid item>
        <FormControl
          sx={{
            maxWidth: {
              xs: "200px",
              sm: "400px",
            },
            minWidth: {
              xs: "200px",
            },
          }}
          variant="outlined"
        >
          <InputLabel id="active-group-select">Active Group</InputLabel>
          <Select
            labelId="active-group-select"
            onChange={onActiveGroupChanged}
            value={activeGroupMembership ? activeGroupMembership.id : ""}
            label="Active Group"
            inputProps={{
              name: "active group",
              id: "group-select",
            }}
          >
            {userGroupMemberships && userGroupMemberships?.groupMemberships?.map((groupMembership) => (
              <MenuItem
                key={`menu-item-group-id-${groupMembership.id}`}
                value={groupMembership.id}
              >
                <Typography variant="inherit" noWrap>
                  {groupMembership.group.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button onClick={onAddGroup}>
          + Add Group
        </Button>
      </Grid>
    </Grid>
  );
}
