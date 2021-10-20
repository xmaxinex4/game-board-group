import React from "react";

import { Dialog, DialogTitle, Typography } from "@mui/material";

export interface GenerateJoinGroupLinkDialogProps {
  setGeneratedLink: () => void;
  onClose: () => void;
  open: boolean;
}

export function GenerateJoinGroupLinkDialog(props: GenerateJoinGroupLinkDialogProps): React.ReactElement {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle><Typography>Generate Link</Typography></DialogTitle>
    </Dialog>
  );
}
