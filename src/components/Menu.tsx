import { Box } from "@mui/material"
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';

const StyledLink = styled(NavLink)({
  color: "black",
	textDecoration: "none",
	padding: 10,

	"&.active": {
		color: "white",
		backgroundColor: "blue",
		fontWeight: "bold",
		borderRadius: 4,
	}

})

export const Menu = () => {
	const MenuItems = [
		{
			name: "Главная",
			link: "/home",
		},
		{
			name: "Задача коммивояжера",
			link: "/home/tsp",
		},
		{
			name: "Справка",
			link: "/home/info",
		}
	];

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				{
					MenuItems.map((item) => (
						<StyledLink to={item.link}
							end
							// style={({ isActive }) =>
							// 	isActive
							// 		? { color: 'white', backgroundColor: 'blue', padding: '10px', borderRadius: '4px' }
							// 		: {}
							// }
						>
							{item.name}
						</StyledLink>
					))
				}
			</Box>
		</>
	)
}