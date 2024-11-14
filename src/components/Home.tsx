// import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [data, setData] = useState();

    // const [name, setName] = useState<string>("");
    // const [age, setAge] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://python-patient-solely.ngrok-free.app', {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': "yes"
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных:', error);
                });
        };
        fetchData();
    }, [])

    return (
        <>
            <div>Home</div>
            <Link to="home/tsp">задача коммивояжера</Link>
            <hr />
            <Link to="home">калькулятор</Link>
            <hr />
            <Link to="user">Войти</Link>
            <hr />
            <Link to="user\register">Зарегистрироваться</Link>
            <hr />

            {
                JSON.stringify(data, null, 2)
            }
        </>
    )
}