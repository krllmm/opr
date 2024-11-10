import { Box } from "@mui/material"
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';
import { MenuItems } from "../data/menuitems"

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
	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", height: "100vh", paddingInline: "8px" }}>
				{
					MenuItems.map((item) => (
						<StyledLink
							to={item.link}
							end
						>
							{item.name}
						</StyledLink>
					))
				}
			</Box>
		</>
	)
}