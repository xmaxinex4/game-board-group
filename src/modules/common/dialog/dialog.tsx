import React, { ReactNode } from "react";

import { Card, Dialog as MuiDialog } from "@material-ui/core";

export interface DialogProps {
  isDialogOpen: boolean,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Dialog(props: DialogProps & { children: ReactNode; }): React.ReactElement {
  const { isDialogOpen, setIsDialogOpen, children } = props;

  const closeOptionsDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <MuiDialog
      onClose={closeOptionsDialog}
      open={isDialogOpen}
    >
      <Card>
        {children}
      </Card>
    </MuiDialog>
  );
}
