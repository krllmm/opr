import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CityCoordinates, { City } from "./CityCoordinates";
import Canvas from "./Canvas";

export default function Tsp() {

	const [bestLenght, setBestLenght] = useState<number>(0);
	const [bestRoute, setBestRoute] = useState<[]>([]);
	const [matrix, setMatrix] = useState<number[][]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// const [message, setMessage] = useState();

	const handleSolve = (cities: City[], populationSize: number, generations: number) => {
		setBestLenght(0)
		setBestRoute([])

		const matrix = cities.map(city => [Number(city.x), Number(city.y)])
		setMatrix(matrix)
		setLoading(true)

		fetch('https://python-patient-solely.ngrok-free.app/solve_tsp', {
			method: "POST",
			headers: {
				'ngrok-skip-browser-warning': "yes",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				populationSize: populationSize,
				coords: matrix,
				generations: generations,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				setBestRoute(data['best_route']);
				setBestLenght(data['best_lenght']);
				setLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});
	}

	return (
		<>
			<Typography variant="h3" sx={{ alignSelf: "center", my: 4 }}>Задача коммивояжера</Typography>
			<Box 
				sx={{
					minWidth: "70%",
					marginInline: "auto",
					marginBottom: "24px",
					display: "flex",
					flexDirection: "column",
					// backgroundColor: "lightgrey",
					overflowY: "visible",
				}}
			>

				<CityCoordinates 
					solve={handleSolve} 
					sx={{ 
						opacity: loading ? "0.25" : "1", 
						pointerEvents: loading ? "none" : "auto" 
						}} 
				/>

				{
					bestLenght !== 0 && (
						<Typography variant="h6" sx={{ marginTop: 2 }}>
							Длина маршрута: {bestLenght.toFixed(2)}
						</Typography>
					)
				}

				{
					bestRoute.length !== 0 && (
						<Canvas
							coordinates={matrix}
							order={bestRoute}
						/>
					)
				}

			</Box>
		</>
	)
}