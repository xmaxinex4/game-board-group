import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip,
  TooltipProps,
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
  const [tooltipState, setTooltipState] = useState<{ text: string, placement: TooltipProps["placement"]; }>(
    { text: "Copy to Clipboard", placement: "bottom" },
  );

  const dispatch = useDispatch();

  const closeGenerateInviteLinkDialog = useCallback(
    () => setGenerateLinkDialogOpen(false),
    [setGenerateLinkDialogOpen],
  );

  const openGenerateInviteLink = useCallback(() => {
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
          closeGenerateInviteLinkDialog();
        });
    }
  }, [activeGroupMembership, setGeneratingLink, linkTimeout, closeGenerateInviteLinkDialog, activeGroupMembership]);

  const copyLinkToClipboard = useCallback(() => {
    navigator.clipboard.writeText(activeGroupMembership?.activeInvitationLink || "");
    setTooltipState({ text: "Copied", placement: "top" });
    setTimeout(() => {
      setTooltipState({ text: "Copy to Clipboard", placement: "bottom" });
    }, 1000);
  }, [setTooltipState, activeGroupMembership]);

  return (
    <TabContentContainer title="Group Members">
      <Grid container direction="column" spacing={4}>
        {activeGroupMembership?.isAdmin && (
          activeGroupMembership?.activeInvitationLink
            ? (
              <Grid container item direction="column" alignItems="center" justifyContent="center" spacing={3}>
                <Grid item sx={{ width: { xs: "100%", sm: "unset" } }}>
                  <FormControl
                    variant="outlined"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "550px",
                      },
                    }}
                  >
                    <InputLabel>Invite Link</InputLabel>
                    <OutlinedInput
                      readOnly
                      id="invite-link"
                      value={activeGroupMembership?.activeInvitationLink}
                      inputProps={{ sx: { textOverflow: "ellipsis" } }}
                      endAdornment={(
                        <InputAdornment position="end">
                          <Tooltip title={tooltipState.text} placement={tooltipState.placement}>
                            <IconButton
                              color="primary"
                              aria-label="copy invite link to clipboard"
                              onClick={copyLinkToClipboard}
                              edge="end"
                            >
                              <ContentCopyTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )}
                      label="Invite Link"
                    />
                    <FormHelperText id="invite-link-helper-text">
                      Send link to a friend to join this group
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button onClick={openGenerateInviteLink} variant="contained">
                    Generate New Link
                  </Button>
                </Grid>
              </Grid>
            )
            : (
              <Grid item sx={{ marginLeft: "auto" }}>
                <Button onClick={openGenerateInviteLink} variant="contained">+ Member</Button>
              </Grid>
            )
        )}
        <Grid item>
          <ActiveGroupMembershipTable />
        </Grid>
      </Grid>
      {activeGroupMembership?.isAdmin && (
        <Dialog
          onClose={closeGenerateInviteLinkDialog}
          open={generateLinkDialogOpen}
          sx={{ ".MuiDialog-container": { marginTop: "64px", height: "unset" } }}
        >
          <DialogContent>
            <Grid container alignItems="center" justifyContent="center" spacing={4}>
              <Grid item xs={12}>
                <DialogContentText>
                  Send an invite link to a friend to join this group
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="invite-link-expire-time">Expire After</InputLabel>
                  <Select
                    labelId="set-link-expire-time"
                    id="link-expire-time-select"
                    value={linkTimeout}
                    label="Expire After"
                    sx={{ width: "100%" }}
                    fullWidth
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
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ padding: "24px", paddingTop: "16px" }}>
            <Grid container justifyContent="right" spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="outlined" onClick={closeGenerateInviteLinkDialog} disabled={generatingLink}>Cancel</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" onClick={generateNewLink} disabled={generatingLink}>Generate Invite Link</Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </TabContentContainer>
  );
}
