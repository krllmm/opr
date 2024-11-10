import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Tsp() {

    const [bestLenght, setBestLenght] = useState();
    const [bestRoute, setBestRoute] = useState<unknown[]>([]);
    const [populationSize, setPopulationSize] = useState<number>(10);  //select box
    const [coords, setCoords] = useState<string>("")
    // const [message, setMessage] = useState();

    const handleSolve = () => {

        const numbers = coords.trim().split(' ').map(Number);

        // Проверяем, что количество чисел четное
        if (numbers.length % 2 !== 0) {
            throw new Error("Количество чисел должно быть четным");
        }

        // Разбиваем массив чисел на матрицу с двумя столбцами
        const matrix = [];
        for (let i = 0; i < numbers.length; i += 2) {
            matrix.push([numbers[i], numbers[i + 1]]);
        }

        fetch('https://python-patient-solely.ngrok-free.app/solve_tsp', {
            method: "POST",
            headers: {
                'ngrok-skip-browser-warning': "yes",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                populationSize: populationSize,
                coords: matrix,
                // [[3, 4], [1, 6], [1, 3], [0, 7], [7, 8]]
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
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }

    return (
        <>
            <Box
                sx={{
                    minWidth: "60%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    backgroundColor: "ghostwhite"
                }}
            >
                <Typography variant="h4" sx={{ alignSelf: "center" }}>Задача коммивояжера</Typography>

                <Box>
                    <TextField value={coords} onChange={e => setCoords(e.target.value)}></TextField>
                </Box>

                <TextField value={populationSize} onChange={e => setPopulationSize(+e.target.value)}></TextField>

                <Button onClick={handleSolve} variant="contained">Решить задачу</Button>

                {
                    bestLenght
                }

                <hr />

                {
                    bestRoute ? bestRoute.join(" -> ") : ""
                }

            </Box>
        </>
    )
}