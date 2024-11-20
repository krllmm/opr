/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import ThingsWeights, { Item } from "./ThingsWeights";
import { ChangeEvent, useState } from "react";

export default function Kp() {
    const [bestCombination, setBestCombination] = useState<string[]>([]);
    const [remainingSpace, setRemainingSpace] = useState<number | null>(null);
    const [value, setValue] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState<any>()

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
        setRemainingSpace(null)
        setBestCombination([])

        console.log("items: ", items)
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
                console.log(data)
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
            setMessage("Введите название для сохранения")
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
                    // backgroundColor: "lightgrey",
                    overflowY: "visible",
                }}
            >

                <ThingsWeights
                    solve={handleSolve}
                    getData={getHistory}
                    sx={{
                        opacity: loading ? "0.25" : "1",
                        pointerEvents: loading ? "none" : "auto"
                    }}
                />
                {
                    bestCombination.length !== 0 ? <Typography>Лучший набор предметов: {bestCombination.join(", ")}</Typography> : ""
                }
                {
                    remainingSpace ? <Typography>Незаполненный вес: {remainingSpace}</Typography> : ""
                }
                {
                    value ? <Typography>Стоимость предметов: {value}</Typography> : ""
                }
                {
                    bestCombination.length !== 0 ?
                        <Box>
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
                        : ""
                }
                {
                    message ? <Typography sx={{ color: "red" }}>{message}</Typography> : ""
                }
            </Box>

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
                    Запись сохранена
                </Alert>
            </Snackbar>
        </>
    )
}