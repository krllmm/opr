import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function userComponent() {
    return (
        <>
            <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <Box sx={{
                    borderRadius: "1rem",
                    borderColor: "#969696",
                    borderStyle: "solid",
                    padding: "1rem"
                }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}