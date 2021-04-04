import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom'

import { makeStyles, Theme } from "@material-ui/core";

export interface SiteLinkProps extends LinkProps {
  text: string
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",

    '&:hover': {
      textDecoration: "underline"
    }
  }
}));

export const SiteLink: React.FunctionComponent<SiteLinkProps> = ({ text, ...linkProps }) => {
  const styles = useStyles({});

  return (
    <Link className={styles.link} {...linkProps}>
      {text}
    </Link>
  );
}