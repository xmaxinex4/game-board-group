import React from "react";

import Icon from "@mdi/react";
import { mdiCancel, mdiContentSave } from "@mdi/js";
import { Button, Card, CardHeader, CardContent, Grid, Modal, ModalProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { User } from "../../api-types/user";

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px"
  },

  div: {
    paddingTop: "50px",
    paddingBottom: "50px"
  },
});

export interface AddOwnersModalProps extends Pick<ModalProps, "open"> {
  closeModal: () => void;
  owners: User[];
  setOwners: React.Dispatch<React.SetStateAction<User[]>>;
}

export function AddOwnersModal(props: AddOwnersModalProps): React.ReactElement {
  const {
    owners,
    setOwners,
    open,
    closeModal,
  } = props;

  const { card, div } = useStyles();

  const onModalCancel = React.useCallback(
    () => {
      closeModal();
    },
    [closeModal],
  );

  const onModalSave = React.useCallback(
    () => {
      console.log("Save modal");
    },
    [],
  );

  return (
    <Modal
      aria-labelledby="add-owners-modal"
      aria-describedby="adding-owners"
      open={open}
      onClose={closeModal}
    >
      <Grid container justifyContent="center">
        <Grid item>
          <div className={div}>
            <Card className={card}>
              <CardHeader title="Add Game" />
              <CardContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    OWNER TYPEAHEAD HERE
                  </Grid>
                  <Grid item>
                    OWNER CIRCLE DISPLAY HERE
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Icon path={mdiContentSave} size={0.5} />}
                      onClick={onModalSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Icon path={mdiCancel} size={0.5} />}
                      onClick={onModalCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </Modal>
  );
}
