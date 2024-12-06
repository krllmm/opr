import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
    setUser: (id: string) => void
}

export default function Register({ setUser }: RegisterProps) {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [, setMessage] = useState<string>("");

    const handleSubmit = () => {

        if (password !== confirmPassword) {
            setMessage("Пароли не совпадают")
            return;
        }

        fetch('https://flaskoprserver-production.up.railway.app/create_user', {
            method: 'POST',
            headers: {
                // 'ngrok-skip-browser-warning': "yes",
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

                if (data["message"] === "Аккаунт создан") navigate("/home");
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });

        console.log(username, password);
    }

    useEffect(() => {
        const id = localStorage.getItem("user");
        if(id) navigate("../home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 2,
                p: 4,
                bgcolor: "#eeeeee",
                border: "solid 2px",
                borderColor: "#969696",
                borderRadius: "1rem",

                '@media (max-width:600px)': {
                    border: 'none',
                    p: 2,
                },
            }}
        >
            <Typography variant="h4" gutterBottom color="#4b866e" align="center">
                Регистрация
            </Typography>
            <Typography variant="body1" align="center">
                Создайте аккаунт, чтобы начать использовать нашу платформу.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="Имя"
                    variant="outlined"
                    margin="normal"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Подтвердите пароль"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: "#4b866e" }}
                    onClick={handleSubmit}
                >
                    Зарегистрироваться
                </Button>
                <Typography variant="body2" align="center">
                    Уже есть аккаунт?{' '}
                    <Button
                        component={Link}
                        to="../"
                        color="primary"
                        sx={{ textTransform: 'none', p: 0, ml: 0.5 }}
                    >
                        Войти
                    </Button>
                </Typography>
            </Box>
        </Container>
    )
}