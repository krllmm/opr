import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function UserComponent() {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <Outlet />
            </Box>
        </>
    )
}