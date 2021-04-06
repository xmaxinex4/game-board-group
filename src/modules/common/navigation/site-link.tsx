/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core";

export interface SiteLinkProps extends LinkProps {
  text: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export function SiteLink(props: SiteLinkProps): React.ReactElement {
  const { text, ...linkProps } = props;
  const styles = useStyles({});

  return (
    <Link className={styles.link} {...linkProps}>
      {text}
    </Link>
  );
}
