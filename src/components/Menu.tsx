import { Box } from "@mui/material"
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';
import { MenuItems } from "../data/menuItems"
import { useEffect, useState } from "react";

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const StyledLink = styled(NavLink)({
	color: "#272727",
	textDecoration: "none",
	paddingBlock: 10,
	paddingInline: 20,
	marginTop: 8,
    marginInline: "8px",
	display: "flex",
	alignItems: 'center',
	transition: 'background-color 0.3s, color 0.3s',

	"&.active": {
		color: "#090909",
		backgroundColor: "#4b866e",
		fontWeight: "bold",
		borderRadius: 6,
	}
})

interface MenuProps {
	logout: () => void
}

export const Menu = ({ logout }: MenuProps) => {
	const [username, setUsername] = useState<string | null>(null);

	const getUsername = async (userId: string) => {
		const response = await fetch('https://flaskoprserver-production.up.railway.app/get_user', {
			method: 'POST',
			headers: {
				// 'ngrok-skip-browser-warning': "yes",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: userId,
			}),
		});

		const result = await response.json();
		const data = JSON.parse(result)
		setUsername(data[0].username)
	}

	useEffect(() => {
		const id = localStorage.getItem("user")
		if (id) {
			getUsername(id)
		}
	}, [])

	return (
		<>
			<Box sx={{ minWidth: "260px", display: "flex", flexDirection: "column", height: "100vh", position: "sticky" }}>
				<StyledLink
					to="/"
					end
				>
					<ArrowBackIcon />
				</StyledLink>
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				{
					username ?
						<Box sx={{ display: "flex", alignItems: "center", marginTop: "auto", marginBottom: "8px" }}>
							<StyledLink
								to="/"
								end
								sx={{
									marginTop: 0
								}}
							>
								<AccountCircleIcon sx={{ mr: 1 }} /> {username}
							</StyledLink>
							<LogoutIcon sx={{ mr: 2, ml: "auto", cursor: "pointer" }} onClick={logout} />
						</Box>
						: 
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: "auto", marginBottom: "8px" }}>
                            <LogoutIcon sx={{ mr: 2, ml: "auto", cursor: "pointer" }} onClick={logout} />
                        </Box>
				}
			</Box>
		</>
	)
}