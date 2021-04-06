import React from "react";

import Icon from "@mdi/react";
import { Button } from "@material-ui/core";

export interface TextButtonInputProps {
  icon?: string;
  onClick: () => void;
  text: string;
}

// const useStyles = makeStyles({
//   button: {

//   }
// });

export function TextButton(props: TextButtonInputProps): React.ReactElement {
  const { icon, onClick, text } = props;
  // const classes = useStyles({});
  // const [showPassword, setShowPassword] = React.useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <Button
      onClick={onClick}
      // className={classes.button}
      startIcon={icon ? <Icon path={icon} size={0.5} /> : null}
    >
      {text}
    </Button>
  );
}
