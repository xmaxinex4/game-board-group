import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/EditTwoTone";

import {
  Grid,
  Typography,
  Theme,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/styles";

import { selectActiveUser } from "../../redux/active-user-slice";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { EditAccountForm } from "../../modules/account/edit/form";
import { ActiveUserInfoDisplay } from "../../modules/user/active-user-info-display";
import { ChangePasswordForm } from "../../modules/account/change-password/form";

export function AccountSettings(): React.ReactElement {
  const theme = useTheme<Theme>();
  const activeUser = useSelector(selectActiveUser);

  const [snackbarState, setSnackbarState] = useState<{ isOpen: boolean, message: string; }>({ isOpen: false, message: "" });

  const closeSnackbar = useCallback(() => {
    setSnackbarState({ isOpen: false, message: "" });
  }, [setSnackbarState]);

  const [editingAccount, setEditingAccount] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const openEditAccount = useCallback(() => {
    setEditingAccount(true);
  }, [setEditingAccount]);

  const closeEditAccount = useCallback(() => {
    setEditingAccount(false);
  }, [setEditingAccount]);

  const openChangePassword = useCallback(() => {
    setEditingPassword(true);
  }, [setEditingPassword]);

  const closeChangePassword = useCallback(() => {
    setEditingPassword(false);
  }, [setEditingPassword]);

  return (
    <TabContentContainer>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Grid item>
          <ActiveUserInfoDisplay />
        </Grid>
        <Grid
          item
          direction="column"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Card sx={{ margin: "auto", maxWidth: "450px", minWidth: "275px" }}>
            <CardContent>
              {editingAccount && (
                <EditAccountForm
                  onCancel={closeEditAccount}
                  onSave={closeEditAccount}
                  initialData={{
                    username: activeUser?.username || "",
                    color: activeUser?.color || "Red",
                  }}
                />
              )}
              {!editingAccount && (
                <Grid container>
                  <Grid item xs={10}>
                    <Grid container justifyContent="center" spacing={6}>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography color={theme.palette.grey[600]} variant="subtitle2">
                              Username
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              {activeUser?.username}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography color={theme.palette.grey[600]} variant="subtitle2">
                              Color
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              {activeUser?.color}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton color="primary" onClick={openEditAccount}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          direction="column"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Card sx={{ margin: "auto", maxWidth: "450px", minWidth: "275px" }}>
            <CardContent sx={{ textAlign: "center" }}>
              {editingPassword && (
                <ChangePasswordForm
                  onCancel={closeChangePassword}
                  onSave={closeChangePassword}
                />
              )}
              {!editingPassword && (
                <Button
                  sx={{ textAlign: "center" }}
                  onClick={openChangePassword}
                >
                  <Typography variant="button">
                    Change Password
                  </Typography>
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.isOpen}
        message={snackbarState.message}
        onClose={closeSnackbar}
      />
    </TabContentContainer>
  );
}
