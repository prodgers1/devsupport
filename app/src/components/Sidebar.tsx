import { Grid } from "@mui/material";
import { Link } from "@remix-run/react";

export default function Sidebar() {
    return (
        <Grid container flexDirection="column" xs={12} sm={3} className="toolbox">
            <Grid item>
                <Link to="base64">Base 64 Encoding/Decoding</Link>
            </Grid>
            <Grid item>
                <Link to="formatJson">Pretty Print JSON</Link>
            </Grid>
        </Grid>
    )
}