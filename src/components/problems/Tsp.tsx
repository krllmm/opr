import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
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

	function handleLabelChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
		console.log(e)
		throw new Error("Function not implemented.");
	}

	function handleClickSave(): void {
		throw new Error("Function not implemented.");
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

				<Box
					sx={{
						marginInline: "auto",
						paddingInline: 1,
						'@media (max-width:550px)': {
							width: "350px"
						},
						width: "500px"
					}}
				>
					{
						bestLenght !== 0 && (<>
							<Divider textAlign="left" sx={{ mt: 2 }}>Результат</Divider>
							<Typography variant="h6" sx={{ backgroundColor: "lightgray", borderRadius: "6px", paddingLeft: "6px", marginBlock: "6px" }}>
								Длина маршрута: {bestLenght.toFixed(2)}
							</Typography>
							<Typography variant="h6" sx={{ backgroundColor: "lightgray", borderRadius: "6px", paddingLeft: "6px", marginBlock: "6px" }}>
								Оптимальный маршрут: {bestRoute.join("->")}
							</Typography>
						</>
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
					{
						bestRoute.length !== 0 && (
							<>
								<Divider textAlign="left" sx={{ my: 2 }}>Сохраните свой результат</Divider>
								<Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: "6px" }}>
									<TextField
										label="Название"
										type="text"
										size="small"
										variant="outlined"
										value="Название"
										onChange={(e) => handleLabelChange(e)}
									/>
									<Button variant="contained" onClick={handleClickSave}>Сохранить</Button>
								</Box>
							</>
						)
					}
				</Box>
			</Box>
		</>
	)
}