import React from "react"
import { Link, Outlet } from "@remix-run/react";
import Grid from "@mui/material/Grid"

export default function Index() {
  return (
    <React.Fragment>
        Select a tool!
        <Outlet />
    </React.Fragment>
  );
}
