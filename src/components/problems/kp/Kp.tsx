/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Divider, Snackbar, TextField, Typography } from "@mui/material";
import ThingsWeights, { Item } from "./ThingsWeights";
import { ChangeEvent, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';

export default function Kp() {
	const [bestCombination, setBestCombination] = useState<string[]>([]);
	const [remainingSpace, setRemainingSpace] = useState<number | null>(null);
	const [value, setValue] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(false);
	const [label, setLabel] = useState<string>("");
	const [saveErrorMessage, setSaveErrorMessage] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [history, setHistory] = useState<any>();
	const [graphData, setGraphData] = useState<any | null>();

	const getHistory = (items: Item[], populationSize: number, generations: number, maxWeight: number) => {
		setHistory({
			items: items,
			populationSize: populationSize,
			generations: generations,
			maxWeight: maxWeight
		})
	}

	const handleSolve = (items: Item[], populationSize: number, generations: number, max_weight: number) => {
		setValue(null)
		setGraphData(null)
		setRemainingSpace(null)
		setBestCombination([])

		// console.log("items: ", items)
		setLoading(true)

		fetch('https://python-patient-solely.ngrok-free.app/solve_kp', {
			method: "POST",
			headers: {
				'ngrok-skip-browser-warning': "yes",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				populationSize: populationSize,
				items: items,
				generations: generations,
				max_weight: max_weight,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				const gens: any = []
				const values: any = []
				const labels: any = []
				data["midcalc"].map((m: any) => {
					gens.push(m[0])
					values.push(m[2])
					labels.push(m[1].join(", "))
				})
				gens.push(generations)
				values.push(data["value"])
				labels.push(data["best_combination"])
				//график цены от поколения, на котором можно навести на точку и посмотреть распределение вещей
				setGraphData([gens, values, labels])

				console.log(graphData)

				setLoading(false)
				setBestCombination(data["best_combination"])
				setRemainingSpace(data["remaining_space"])
				setValue(data["value"])
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});
	}

	const handleClickSave = () => {
		if (!label) {
			setSaveErrorMessage(true)
			return
		}

		console.log("history: ", history)
		setLoading(true)

		fetch('https://python-patient-solely.ngrok-free.app/save_record', {
			method: "POST",
			headers: {
				'ngrok-skip-browser-warning': "yes",
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

	const handleLabelChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setHistory((history: any) => ({
			...history,
			type: "Задача о рюкзаке",
			bestCombination: bestCombination,
			remainingSpace: remainingSpace,
			value: value,
			label: e.target.value,
		}))
		setLabel(e.target.value)
		console.log(history)
	}

	const handleClose = () => {
		setOpen(false)
		setSaveErrorMessage(false)
	};

	return (
		<>
			<Typography variant="h3" sx={{ alignSelf: "center", my: 4 }}>Задача о рюкзаке</Typography>
			<Box
				sx={{
					minWidth: "70%",
					marginInline: "auto",
					marginBottom: "24px",
					display: "flex",
					flexDirection: "column",
					overflowY: "visible",
					// backgroundColor: "lightgray"
				}}
			>
				<ThingsWeights
					solve={handleSolve}
					getData={getHistory}
					sx={{
						opacity: loading ? "0.25" : "1",
						pointerEvents: loading ? "none" : "auto",
						// marginInline: 1,
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
						bestCombination.length !== 0 ? (<>
							<Divider textAlign="left" sx={{ mt: 2 }}>Результат</Divider>
							<Typography variant="h6" sx={{ backgroundColor: "lightgray", borderRadius: "6px", paddingLeft: "6px", marginTop: "6px" }}>Лучший набор предметов: {bestCombination.join(", ")}</Typography>
						</>
						) : ""
					}
					{
						remainingSpace ? <Typography variant="h6" sx={{ backgroundColor: "lightgray", borderRadius: "6px", paddingLeft: "6px", marginTop: "6px" }}>Незаполненный вес: {remainingSpace}</Typography> : ""
					}
					{
						value ? <Typography variant="h6" sx={{ backgroundColor: "lightgray", borderRadius: "6px", paddingLeft: "6px", marginTop: "6px" }}>Стоимость предметов: {value}</Typography> : ""
					}
					{
						graphData ?
							<Box sx={{ marginInline: "auto" }}>
								<LineChart
									xAxis={[{ data: graphData[0] }]}
									series={[
										{
											data: graphData[1],
										},
									]}
									height={300}
									sx={{ width: "100%" }}
								/>
							</Box>
							: ""
					}
					{
						bestCombination.length !== 0 ? (
							<>
							<Divider textAlign="left" sx={{ my: 2 }}>Сохраните свой результат</Divider>
							<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
							: ""
					}
				</Box>
			</Box>

			<Snackbar
				open={saveErrorMessage}
				autoHideDuration={2000}
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
				autoHideDuration={2000}
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
		</>
	)
}