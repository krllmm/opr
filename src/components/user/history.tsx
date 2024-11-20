import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface HistoryItem {
    label: string;
    bestCombination: number[]; 
    populationSize: number;
    generations: number;
    maxWeight: number;
    type: string;
    reminingSpace: number;
    value: number;
    timestamp: string;
}


export default function History(){
    const [history, setHistory] = useState<HistoryItem[]>([])

    const getHistory = async () => {
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
                setHistory(data["history"])
                console.log(data["history"])
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }

    useEffect(() => {
        getHistory()
    }, [])

    return(
        <>
            <Typography variant="h3" sx={{ alignSelf: "center", my: 4 }}>Иcтория решения</Typography>
            {
                history.length !== 0 ? history.map((item, index) => (<Typography key={index}>{index + 1}: {item.label}({item.type}) |  
                {`${new Date(item.timestamp).getDate()}-${new Date(item.timestamp).getMonth() + 1}-${new Date(item.timestamp).getFullYear()} 
                    ${new Date(item.timestamp).getHours()}:${new Date(item.timestamp).getMinutes()}`}</Typography>)) : ""
            }
        </>
    )
}