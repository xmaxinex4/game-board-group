import * as React from 'react'
import Icon from "@mdi/react";

import { makeStyles, Button } from "@material-ui/core";

export interface TextButtonInputProps {
  icon?: string;
  onClick: () => void;
  text: string;
}

const useStyles = makeStyles({
  button: {

  }
});

export const TextButton: React.FunctionComponent<TextButtonInputProps> =
  ({ icon, onClick, text }) => {
    const classes = useStyles({});
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Button
        onClick={onClick}
        className={classes.button}
        startIcon={icon ? <Icon path={icon} size={0.5} /> : null}
      >
        {text}
      </Button>
    )
  }