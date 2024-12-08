/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Drawer, List } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { Outlet } from "react-router-dom"
import { Menu, StyledLink } from "./Menu";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItems } from "../data/menuItems";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {

	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

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
						<Box sx={{
							position: "absolute",
							'@media (min-width:980px)': {
								display: "none",
							},
						}}>
							<MenuIcon sx={{ cursor: "pointer" }} onClick={toggleDrawer(true)} />
						</Box>

						<Drawer open={open} onClose={toggleDrawer(false)}>
							<List>
								{
									MenuItems.map((item: any, index: any) => {
										const Icon = item.icon;
										return (
											<StyledLink
												to={item.link}
												end
												key={index}
											>
												<Icon sx={{ mr: 1 }} />{item.name}
											</StyledLink>
										)
									}
									)
								}
							</List>

							<Box sx={{ display: "flex", alignItems: "center", marginTop: "auto", marginBottom: "8px" }}>
								<LogoutIcon sx={{ mr: 2, ml: "auto", cursor: "pointer" }} onClick={logout} />
							</Box>

						</Drawer>

						<Outlet />
					</Grid>
				</Grid>
			</Box>
		</>
	)
}