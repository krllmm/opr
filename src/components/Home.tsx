import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://python-patient-solely.ngrok-free.app', {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': "yes"
                },
            })
                .then(response => {
                    // Проверяем, успешен ли запрос
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    console.log(response)
                    // Читаем тело ответа как JSON
                    return response.json();
                })
                .then(data => {
                    console.log('Данные:', data);
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

            {
                JSON.stringify(data, null, 2)
            }
        </>
    )
}