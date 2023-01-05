import { Grid } from "@mui/material";
import { Link } from "@remix-run/react";

export default function Sidebar() {
    return (
        <Grid item xs={12} sm={3} className="toolbox" height="100vh">
            <Link to="base64">Base 64 Encoding/Decoding</Link>
        </Grid>
    )
}