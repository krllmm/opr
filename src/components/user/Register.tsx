import { Button, Divider, FormControl, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";

const StyledLink = styled(NavLink)({
    color: "#272727",
    width: "max-content",
})

interface RegisterProps {
    setUser: (id: string) => void
} 

export default function Register({ setUser }: RegisterProps) {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = () => {

        if(password !== confirmPassword){ 
            setMessage("Пароли не совпадают")
            return;
        }

        fetch('https://python-patient-solely.ngrok-free.app/create_user', {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': "yes",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMessage(data["message"])
                console.log(data)
                setUser(data['id'])

                if(data["message"] === "Аккаунт создан") navigate("/home");
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });

        console.log(username, password);
    }

    return (
        <>
            <Typography variant="h5">Крутой сайт</Typography>
            <Divider sx={{ marginBlock: "8px" }} />
            <FormControl sx={{ gap: "12px" }}>
                <Typography>Логин</Typography>
                <TextField size="small" value={username} placeholder="Логин" onChange={e => setUsername(e.target.value)}></TextField>
                <Typography>Пароль</Typography>
                <TextField type="password" size="small" value={password} placeholder="Пароль" onChange={e => setPassword(e.target.value)}></TextField>
                <Typography>Подтверждение пароля</Typography>
                <TextField type="password" size="small" value={confirmPassword} placeholder="Пароль" onChange={e => setConfirmPassword(e.target.value)}></TextField>

                <Button onClick={handleSubmit} variant="contained">Зарегистрироваться</Button>
                <Typography sx={{ marginInline: "auto" }}>
                    Уже есть аккаунт? &nbsp;
                    <StyledLink to="../">Войти</StyledLink>
                </Typography>

                {
                    message 
                }
            </FormControl>
        </>
    )
}
