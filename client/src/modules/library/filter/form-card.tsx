/* eslint-disable react/jsx-props-no-spreading,no-unused-vars */

import React from "react";

import {
  Card,
  CardContent,
} from "@mui/material";

import { FilterForm } from "./form";

export function FilterFormCard(): React.ReactElement {
  return (
    <Card sx={{
      minWidth: {
        xs: "250px",
        sm: "525px",
        md: "650px",
        lg: "900px",
      },
    }}
    >
      <CardContent>
        <FilterForm />
      </CardContent>
    </Card>
  );
}
