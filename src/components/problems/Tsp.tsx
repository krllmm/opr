import { Box, Typography } from "@mui/material";
import { useState } from "react";
import CityCoordinates, { City } from "./CityCoordinates";
import Canvas from "./Canvas";

export default function Tsp() {

    const [bestLenght, setBestLenght] = useState<number>(0);
    const [bestRoute, setBestRoute] = useState<[]>([]);
    const [matrix, setMatrix] = useState<number[][]>([]);
    // const [message, setMessage] = useState();

    const handleSolve = (cities: City[], populationSize: number, generations: number) => {

        const matrix = cities.map(city => [Number(city.x), Number(city.y)])
        setMatrix(matrix)

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

    console.log("matrix: ", matrix)
    console.log("bestRoute: ", bestRoute.map((i) => i + 1));
    //test
    return (
        <>
            <Box
                sx={{
                    minWidth: "60%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    backgroundColor: "ghostwhite",
                    overflowY: "visible",
                }}
            >
                <Typography variant="h4" sx={{ alignSelf: "center" }}>Задача коммивояжера</Typography>

                <CityCoordinates solve={handleSolve} />

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