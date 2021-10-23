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
} from "@mui/material";
import { useTheme } from "@mui/styles";

import { selectActiveUser } from "../../redux/active-user-slice";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { Meeple } from "../../images/components/meeple";
import { EditAccountForm } from "../../modules/account/edit/form";

export function AccountSettings(): React.ReactElement {
  const theme = useTheme<Theme>();
  const activeUser = useSelector(selectActiveUser);

  const [snackbarState, setSnackbarState] = useState<{ isOpen: boolean, message: string; }>({ isOpen: false, message: "" });

  const closeSnackbar = useCallback(() => {
    setSnackbarState({ isOpen: false, message: "" });
  }, [setSnackbarState]);

  const [editingAccount, setEditingAccount] = useState(false);
  // const [editingPassword, setEditingPassword] = useState(false);

  const openEditAccount = useCallback(() => {
    setEditingAccount(true);
  }, [setEditingAccount]);

  const closeEditAccount = useCallback(() => {
    setEditingAccount(false);
  }, [setEditingAccount]);

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
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Meeple size={75} fill={theme.palette.primary.main} />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6">
                    {activeUser?.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                    {activeUser?.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: editingAccount ? "100%" : "unset" }}>
          <Card sx={{ margin: "auto", maxWidth: "600px", minWidth: "300px" }}>
            <CardContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
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
                    <Grid container alignItems="start" justifyContent="space-between" spacing={4}>
                      <Grid item>
                        <Grid container direction="column" spacing={2}>
                          <Grid container item direction="column">
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
                          <Grid container item direction="column">
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
                      <Grid item>
                        <IconButton color="primary" onClick={openEditAccount}>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    //       <Grid container item direction="column">
                    // <Typography color={theme.palette.grey[600]} variant="subtitle2">
                    //   Username
                    // </Typography>
                    //       </Grid>
                    //       <Grid item>
                    // <Typography>
                    //   {activeUser?.username}
                    // </Typography>
                    //       </Grid>
                    //     </Grid>
                    //     <Grid container item direction="column">
                    //       <Typography color={theme.palette.grey[600]} variant="subtitle2">
                    //         Color
                    //       </Typography>
                    //     </Grid>
                    //     <Grid item>
                    //       <Typography>
                    //         {activeUser?.color}
                    //       </Typography>
                    //     </Grid>
                    //     <Grid item>
                    // <IconButton color="primary" onClick={openEditAccount}>
                    //   <EditIcon />
                    // </IconButton>
                    //     </Grid>
                    //   </Grid>
                    //   <Grid container item alignItems="center" justifyContent="center" spacing={2}>
                    //     <Grid item>
                    //       <Grid container item direction="column">
                    //         <Typography color={theme.palette.grey[600]} variant="subtitle2">
                    //           Color
                    //         </Typography>
                    //       </Grid>
                    //       <Grid item>
                    //         <Typography>
                    //           {activeUser?.color}
                    //         </Typography>
                    //       </Grid>
                    //     </Grid>
                    //     <Grid item>
                    //       <IconButton color="primary" onClick={openEditAccount}>
                    //         <EditIcon />
                    //       </IconButton>
                    //   </Grid>
                    // </Grid>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ height: "200px", width: "400px " }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                  Icon
                </Grid>
                <Grid item>
                  Reset Password
                </Grid>
              </Grid>
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
