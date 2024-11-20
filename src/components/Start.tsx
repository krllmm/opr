import { Box, Divider, Typography } from "@mui/material"
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
			<Typography variant="h3" sx={{ my: 4, textAlign: "center" }}>Начните решать новую задачу</Typography>
			<Box
				sx={{
					marginInline: "auto",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						p: 3,
						m: 3,
						backgroundColor: "lightgrey",
						borderRadius: 2,
						boxShadow: 2,
					}}
				>
					<Typography variant="h4" sx={{ color: "#4b866e" }} >
						Задача коммивояжера
					</Typography>
					<Divider sx={{ my: 2 }} />
					<Typography
						variant="h5"
						sx={{
							maxWidth: "600px",
							mb: 4,
						}}
					>
						Задача коммивояжера — это задача
						оптимального маршрута, при котором нужно
						посетить ряд городов ровно один раз и вернуться в начальный пункт. Цель —
						минимизировать общее расстояние.
					</Typography>
					<StyledButton
						to="tsp"
					>
						Решить задачу
					</StyledButton>
				</Box>

				<Box
					sx={{
						p: 3,
						m: 3,
						backgroundColor: "lightgrey",
						borderRadius: 2,
						boxShadow: 2,
					}}
				>
					<Typography variant="h4" gutterBottom sx={{ color: "#4b866e" }}>
						Задача о рюкзаке
					</Typography>
					<Divider sx={{ my: 2 }} />
					<Typography
						variant="h5"
						sx={{
							maxWidth: "600px",
							mb: 4,
						}}
					>
						Задача о рюкзаке состоит в выборе набора предметов с
						максимальной общей ценностью, которые можно поместить в рюкзак
						ограниченной вместимости.
					</Typography>
					<StyledButton
						to="kp"
					>
						Решить задачу
					</StyledButton>
				</Box>
			</Box>

		</>
	)
}