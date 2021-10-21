import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { ActiveGroupMembershipTable } from "../../modules/group-member/table";
import { useApi } from "../../hooks/useApi";
import {
  selectedActiveUserGroupMembership,
  updateActiveUserGroupMembershipActiveInviteLink,
} from "../../redux/active-user-group-memberships-slice";

export function ManageGroup(): React.ReactElement {
  const { apiPost } = useApi();
  const activeGroupMembership = useSelector(selectedActiveUserGroupMembership);

  const [generatingLink, setGeneratingLink] = useState(false);
  const [generateLinkDialogOpen, setGenerateLinkDialogOpen] = useState(false);
  const [linkTimeout, setLinkTimeout] = useState("1WEEK");

  const dispatch = useDispatch();

  const closeGameDetailDialog = useCallback(
    () => setGenerateLinkDialogOpen(false),
    [setGenerateLinkDialogOpen],
  );

  const openGameDetails = useCallback(() => {
    setGenerateLinkDialogOpen(true);
  }, [setGenerateLinkDialogOpen]);

  const onTimeoutChange = useCallback((event: SelectChangeEvent) => {
    setLinkTimeout(event.target.value as string);
  }, []);

  const generateNewLink = useCallback(() => {
    if (activeGroupMembership?.id) {
      setGeneratingLink(true);
      apiPost<{ link: string; }>("/group/generate-invitation-link", {
        groupMembershipId: activeGroupMembership.id,
        timeout: linkTimeout,
      })
        .then(({ data }) => {
          dispatch(updateActiveUserGroupMembershipActiveInviteLink({
            groupMembershipId: activeGroupMembership.id,
            link: data.link,
          }));
        })
        .catch((error) => {
          // TODO: Better error handling
          console.log("Error generating join group link: ", error);
        })
        .finally(() => {
          setGeneratingLink(false);
          closeGameDetailDialog();
        });
    }
  }, [activeGroupMembership, setGeneratingLink, linkTimeout]);

  return (
    <TabContentContainer title="Group Members">
      <Grid container direction="column" spacing={4}>
        {activeGroupMembership?.isAdmin && (
          activeGroupMembership?.activeInvitationLink
            ? (
              <Grid item sx={{ marginLeft: "auto" }}>
                <Typography>{activeGroupMembership.activeInvitationLink}</Typography>
                <Typography>Copy button and Genenerate new button</Typography>
              </Grid>
            )
            : (
              <Grid item sx={{ marginLeft: "auto" }}>
                <Button onClick={openGameDetails} variant="contained">+ Member</Button>
              </Grid>
            )
        )}
        <Grid item>
          <ActiveGroupMembershipTable />
        </Grid>
      </Grid>
      <Dialog onClose={closeGameDetailDialog} open={generateLinkDialogOpen}>
        <DialogTitle>
          <Typography>Generate Link</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Expire After</InputLabel>
            <Select
              labelId="set-link-expire-time"
              id="link-expire-time-select"
              value={linkTimeout}
              label="Expire After"
              onChange={onTimeoutChange}
            >
              <MenuItem value="30MIN">30 minutes</MenuItem>
              <MenuItem value="1HR">1 hour</MenuItem>
              <MenuItem value="6HR">6 hours</MenuItem>
              <MenuItem value="12HR">12 hours</MenuItem>
              <MenuItem value="1DAY">1 day</MenuItem>
              <MenuItem value="1WEEK">1 week</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={generateNewLink} disabled={generatingLink}>Generate Invitation Link</Button>
        </DialogActions>
      </Dialog>
    </TabContentContainer>
  );
}
