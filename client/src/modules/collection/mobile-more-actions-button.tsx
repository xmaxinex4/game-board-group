import React from "react";

import EditIcon from "@mui/icons-material/EditTwoTone";
import RefreshIcon from "@mui/icons-material/SyncRounded";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import MoreOptionsIcon from "@mui/icons-material/MoreVertTwoTone";

import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";

export interface MobileMoreActionsButtonProps {
  onEdit: () => void;
  onRefresh: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

export function MobileMoreActionsButton(props: MobileMoreActionsButtonProps): React.ReactElement {
  const {
    onEdit,
    onRefresh,
    onDelete,
    isLoading,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-collection-card-actions-popover" : undefined;

  return (
    <div>
      <IconButton disabled={isLoading} color="primary" size="medium" onClick={handleClick}>
        <MoreOptionsIcon color="primary" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List component="nav">
          <ListItem disabled={isLoading} button onClick={onEdit}>
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <EditIcon color="primary" fontSize="small" />
            </ListItemIcon>
          </ListItem>
          <ListItem disabled={isLoading} button onClick={onRefresh}>
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <RefreshIcon color="primary" fontSize="small" />
            </ListItemIcon>
          </ListItem>
          <ListItem disabled={isLoading} button onClick={onDelete}>
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <DeleteIcon color="primary" fontSize="small" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
