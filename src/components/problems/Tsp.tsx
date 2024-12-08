/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertTitle, Box, Button, Divider, Snackbar, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CityCoordinates, { City } from "./CityCoordinates";
import Canvas from "./Canvas";

export default function Tsp() {

	const [bestLenght, setBestLenght] = useState<number>(0);
	const [bestRoute, setBestRoute] = useState<[]>([]);
	const [matrix, setMatrix] = useState<number[][]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [pointsOrder, setPointsOrder] = useState<[]>([]) 

	const [saveErrorMessage, setSaveErrorMessage] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [label, setLabel] = useState<string>("");

	const [history, setHistory] = useState<any>();
	const [paramsErrorMessage, setParamsErrorMessage] = useState<string>("")
	const [showParamsError, setShowParamsError] = useState<boolean>(false)

	const getHistory = (cities: City[], populationSize: number, generations: number) => {
		setHistory({
			items: cities,
			populationSize: populationSize,
			generations: generations,
		})
	}

	const handleSolve = (cities: City[], populationSize: number, generations: number) => {

		let notSuitable: boolean = false
		cities.map(c => {
			if (c.x == "" || c.y == "" || +c.x <= 0 || +c.y <= 0) {
				console.log("null found")
				setParamsErrorMessage("Значения координат не могут быть отрицательными или пустыми")
				setShowParamsError(true)
				notSuitable = true
				return
			}
		})

		if (notSuitable) return

		if (generations <= 0) {
			setParamsErrorMessage("Значения количества поколений не может быть отрицательным")
			setShowParamsError(true)
			return
		}

		setBestLenght(0)
		setBestRoute([])

		const matrix = cities.map(city => [Number(city.x), Number(city.y)])
		setMatrix(matrix)
		setLoading(true)

		fetch('https://flaskoprserver-production.up.railway.app/solve_tsp', {
			method: "POST",
			headers: {
				// 'ngrok-skip-browser-warning': "yes",
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
				setPointsOrder(data['best_route'])
				data['best_route'] = data['best_route'].map((i: number) => { return i+1 })
				setBestRoute(data['best_route']);
				setBestLenght(data['best_lenght']);
				setLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});
	}

	function handleLabelChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
		setHistory((history: any) => ({
			...history,
			type: "Задача коммивояжера",
			bestLenght: bestLenght,
			bestRoute: bestRoute,
			label: e.target.value,
		}))
		setLabel(e.target.value)
		console.log(history)
	}

	function handleClickSave(): void {
		if (!label) {
			setSaveErrorMessage(true)
			return
		}

		console.log("history: ", history)
		setLoading(true)

		fetch('https://flaskoprserver-production.up.railway.app/save_record', {
			method: "POST",
			headers: {
				// 'ngrok-skip-browser-warning': "yes",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: localStorage.getItem("user"),
				data: history,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				console.log(data)
				if (data["response"] === "saved") {
					setOpen(true);
				}
				setLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});

	}

	const handleClose = () => {
		setShowParamsError(false)
		setOpen(false)
		setSaveErrorMessage(false)
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
					getData={getHistory}
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
								order={pointsOrder}
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
										value={history.label}
										onChange={(e) => handleLabelChange(e)}
									/>
									<Button variant="contained" onClick={handleClickSave}>Сохранить</Button>
								</Box>
							</>
						)
					}
				</Box>
			</Box>

			<Snackbar
				open={saveErrorMessage}
				autoHideDuration={1500}
				onClose={handleClose}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Введите название для сохранения
				</Alert>
			</Snackbar>

			<Snackbar
				open={open}
				autoHideDuration={1500}
				onClose={handleClose}
			>
				<Alert
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Запись сохранена в историю
				</Alert>
			</Snackbar>

			<Snackbar
				open={showParamsError}
				autoHideDuration={2500}
				onClose={handleClose}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					<AlertTitle>Ошибка данных</AlertTitle>
					{paramsErrorMessage}
				</Alert>
			</Snackbar>
		</>
	)
}