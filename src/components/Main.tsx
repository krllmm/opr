import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { Outlet } from "react-router-dom"
import { Menu } from "./Menu";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Sidebar() {

    const context = useContext(UserContext);

    if (!context) {
        throw new Error('UserProfile must be used within AppProvider');
    }

    const { logout } = context;

    return (
        <>
            <Box sx={{ height: "100vh" }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid
                        sx={{
                            backgroundColor: "#c0c0c0",
                            minWidth: "260px",
                            height: "100%",
                            '@media (max-width:980px)': {
                                display: "none",
                            },
                            overflow: "hidden",
                        }}
                    >
                        <Menu logout={logout} />
                    </Grid>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            height: "100%",
                            overflowY: "auto",
                        }}
                    >
                        <Outlet />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}