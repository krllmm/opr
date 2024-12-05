import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface HistoryItem {
	label: string;
	bestCombination: string;
	populationSize: number;
	generations: number;
	maxWeight: number;
	type: string;
	reminingSpace: number;
	value: number;
	timestamp: string;
}

export default function History() {
	const [history, setHistory] = useState<HistoryItem[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const getHistory = async () => {
		setLoading(true)
		fetch('https://python-patient-solely.ngrok-free.app/get_history', {
			method: "POST",
			headers: {
				'ngrok-skip-browser-warning': "yes",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: localStorage.getItem("user"),
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				data["history"].map((item: any) => {
					item.bestCombination = item.bestCombination.join(", ")
				})
				setHistory(data["history"])
				setTimeout(() =>
					setLoading(false), 500
				)
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});
	}

	useEffect(() => {
		getHistory()
	}, [])

	return (
		<>
			<Typography variant="h3" sx={{ alignSelf: "center", my: 4 }}>Иcтория решения</Typography>
			<Box
				sx={{
					marginInline: "auto",
					display: "flex",
					flexDirection: "column",
					width: "80%",
				}}
			>
				{
					loading === true ?
						<Backdrop
							open={loading}
						>
							<CircularProgress color="inherit" />
						</Backdrop>
						:
						history.length !== 0 ?
							history.map((item, index) => (
								<Accordion sx={{ backgroundColor: "lightgray", mb: 1 }} key={index}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
									>
										<Typography variant="h5">{item.label} ({item.type})</Typography>
									</AccordionSummary>
									<AccordionDetails>

										<Typography>Дата и время расчета:
											{` ${new Date(item.timestamp).getDate()}.${new Date(item.timestamp).getMonth() + 1}.${new Date(item.timestamp).getFullYear()} 
                    ${new Date(item.timestamp).getHours()}:${new Date(item.timestamp).getMinutes()}`}
										</Typography>

										<Typography>Максимальная грузоподъемность: {item.maxWeight}</Typography>
										<Typography>Оптимальная загрузка: {item.bestCombination}</Typography>
										<Typography>Итоговая ценность: {item.value}</Typography>
										<Typography>Оставшееся свободное место: {item.reminingSpace}</Typography>
										<Divider sx={{ my: 1 }} />
										<Typography variant="h5">Параметры решения</Typography>
										<Typography>Размер популяции: {item.populationSize}</Typography>
										<Typography>Количество поколений: {item.generations}</Typography>

									</AccordionDetails>
								</Accordion>
							))
							: ""
				}
			</Box>
		</>
	)
}