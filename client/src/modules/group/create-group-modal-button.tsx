import React from "react";

import { mdiPlus } from "@mdi/js";
import { Modal, Card, CardContent, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ButtonProps } from "@mui/material/Button";

import { TextButton } from "../common/button/text-button";
import { CreateGroupForm } from "./create/form";

export interface CreateGroupModalButtonProps extends ButtonProps {

}

const useStyles = makeStyles({
  card: {
    padding: "24px",
    maxWidth: "500px",
    width: "500px"
  },

  div: {
    paddingTop: "100px",
    paddingBottom: "50px",
    outline: "none"
  }
});

export function CreateGroupModalButton(): React.ReactElement {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);

  const onAddGroup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TextButton text="Add Group" icon={mdiPlus} onClick={onAddGroup} />
      <Modal open={open} onClose={handleClose}>
        <div className={classes.div}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <CreateGroupForm />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};