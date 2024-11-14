import { Box } from "@mui/material"
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';
import { MenuItems } from "../data/menuItems"
import { useEffect, useState } from "react";

const StyledLink = styled(NavLink)({
	color: "#272727",
	textDecoration: "none",
	paddingBlock: 10,
	paddingInline: 20,
	marginTop: 8,

	"&.active": {
		color: "#090909",
		backgroundColor: "#4b866e",
		fontWeight: "bold",
		borderRadius: 6,
	}
})

export const Menu = () => {

	const [userId, setUserId] = useState<string>("");

	useEffect(() => {
		const id = localStorage.getItem('user');
		if(id) setUserId(id);
	}, [])

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100vh", paddingInline: "8px" }}>
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					MenuItems.map((item: any, index: any) => (
						<StyledLink
							to={item.link}
							end
							key={index}
						>
							{item.name}
						</StyledLink>
					))
				}
				{
					userId
				}
			</Box>
		</>
	)
}