import { useState, ChangeEvent } from 'react';
import { TextField, Button, IconButton, Box, FormControl, InputLabel, Select, MenuItem, Divider, Snackbar, Alert, AlertTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SxProps, Theme } from "@mui/material";

export interface Item {
	weight: number | null;
	value: number | null;
}

interface ThingsWeightsProps {
	solve: (weights: Item[], populationSize: number, generations: number, maxWeight: number) => void
	getData: (weights: Item[], populationSize: number, generations: number, maxWeight: number) => void
	sx?: SxProps<Theme>;
}

function ThingsWeights({ solve, getData, sx }: ThingsWeightsProps) {
	const [errorType, setErrorType] = useState<string>("")
	const [error, setError] = useState<string>("")
	const [showErrorSnack, setShowErrorSnack] = useState<boolean>(false)
	const [items, setItems] = useState<Item[]>([{ weight: null, value: null }, { weight: null, value: null }]);
	const [populationSize, setPopulationSize] = useState<number>(10);
	const [generations, setGenerations] = useState(10)
	const [maxWeight, setMaxWeight] = useState(10)

	const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		const updateditems = [...items];
		updateditems[index][name as keyof Item] = +value;
		setItems(updateditems);
	};

	const addItem = () => {
		setItems([...items, { weight: null, value: null }]);
	};

	const removeItem = (index: number) => {
		if (items.length == 2) {
			setErrorType("исходных данных")
			setError("Для расчета необходимо минимум 2 предмета")
			setShowErrorSnack(true)
			return
		}
		
		const updateditems = items.filter((_, i) => i !== index);
		setItems(updateditems);
	};

	const handleErrorClose = () => {
		setShowErrorSnack(false)
	}

	return (
		<>
			<Box sx={{ ...sx, marginInline: "auto", paddingInline: 1 }}>
				<Divider textAlign="left" sx={{ mb: 1.4 }}>Настройки входных данных</Divider>
				<Button variant="contained" sx={{ width: "100%", backgroundColor: "#4b866e", mb: 2.2 }} onClick={addItem}>
					Добавить предмет
				</Button>
				{items.map((item, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							marginBottom: 2,
						}}
					>
						<TextField
							label="Вес предмета"
							type="number"
							size="small"
							name="weight"
							variant="outlined"
							value={item.weight}
							onChange={(e) => handleInputChange(index, e)}
						/>
						<TextField
							label="Ценность"
							type="number"
							size="small"
							name="value"
							variant="outlined"
							value={item.value}
							onChange={(e) => handleInputChange(index, e)}
						/>
						<IconButton color="error" onClick={() => removeItem(index)}>
							<Delete />
						</IconButton>
					</Box>
				))}
				<TextField
					label="Максимальная грузоподъемность"
					type="number"
					size="small"
					variant="outlined"
					value={maxWeight}
					onChange={(e) => setMaxWeight(+e.target.value)}
					sx={{
						width: "100%"
					}}
				/>
				<Divider textAlign="left" sx={{ my: 1.4 }}>Настройки алгоритма</Divider>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<TextField
						label="Количество поколений"
						type="number"
						name="numericValue"
						variant="outlined"
						size="small"
						value={generations}
						onChange={(e) => setGenerations(+e.target.value)}
					/>
					<FormControl variant="outlined">
						<InputLabel>Размер популяции</InputLabel>
						<Select
							label="Размер популяции"
							size="small"
							value={populationSize}
							onChange={(e) => setPopulationSize(+e.target.value)}
						>
							{[10, 20, 30, 40, 50].map((option) => (
								<MenuItem key={option} value={option.toString()}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button sx={{ backgroundColor: "#4b866e" }} onClick={() => { solve(items, populationSize, generations, maxWeight); getData(items, populationSize, generations, maxWeight) }} variant="contained">Решить задачу</Button>
				</Box>
			</Box>

			<Snackbar
				open={showErrorSnack}
				autoHideDuration={1500}
				onClose={handleErrorClose}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					<AlertTitle>Ошибка {errorType}</AlertTitle>
					{error}
				</Alert>
			</Snackbar>
		</>
	);
}

export default ThingsWeights;
