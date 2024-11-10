import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { Outlet } from "react-router-dom"
import { Menu } from "./Menu";

export default function Sidebar() {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container>
					<Grid 
                        size={{ xs: 0, md: 2 }} 
                        sx={{ backgroundColor: "#c0c0c0" }}
                        overflow="hidden"
                    >
						<Menu />
					</Grid>
					<Grid 
                        size={{ xs: 12, md: 10 }} 
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
						<Outlet />
					</Grid>
				</Grid>
			</Box>
		</>
	)
}