import React, { ReactNode } from "react";

import { Card, Modal as MuiModal } from "@material-ui/core";

export interface ModalProps {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal(props: ModalProps & { children: ReactNode; }): React.ReactElement {
  const { isModalOpen, setIsModalOpen, children } = props;

  const closeOptionsModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MuiModal
      open={isModalOpen}
      onClose={closeOptionsModal}
    >
      <Card>
        {children}
      </Card>
    </MuiModal>
  );
}
