import { Box, Typography } from "@mui/material"
import { styled } from '@mui/system';
import { NavLink } from "react-router-dom";

const StyledButton = styled(NavLink)({
	color: "#272727",
	textDecoration: "none",
	backgroundColor: "#4b866e",
	padding: 10,
	borderRadius: 6,

	":hover": {
		color: "#000",
		backgroundColor: "#68b898",
	}
})

export const Start = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "30px"				
				}}
			>

				<Typography variant="h3">Начните решать новую задачу</Typography>

				<Box sx={{ display: "flex", justifyContent: "center", gap: "8px" }}>
					<StyledButton to="tsp">Задача коммивояжера</StyledButton>
					<StyledButton to="2">Задача 2</StyledButton>
				</Box>

			</Box>
		</>
	)
}