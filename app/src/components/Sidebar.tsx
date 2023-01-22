import { Grid } from "@mui/material";
import { Link } from "@remix-run/react";

export default function Sidebar() {
    return (
        <Grid container item flexDirection="column" xs={12} sm={3} className="sidebar" style={{ 'marginTop' : '16px'}}>
            {pages.map(page => (
                <Grid item key={page.link}>
                    <Link className="link" to={page.link}>{page.title}</Link>
                </Grid>
            ))}
        </Grid>
    )
}

export let pages = [
    { link: 'base64', title: 'Base 64' },
    { link: 'formatJson', title: 'Format JSON' },
    { link: 'formatSql', title: 'Format SQL' },
    { link: 'jwtDecode', title: 'JWT Decode' },
    { link: 'keccak256', title: "Keccak-256 Hash"}
]