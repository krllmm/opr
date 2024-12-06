import { Alert, AlertTitle, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setUser: (id: string) => void
}

export default function Login({ setUser }: LoginProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [, setMessage] = useState<string>("");

    const login = () => {
        fetch('https://flaskoprserver-production.up.railway.app/login', {
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

                if (data["message"] === "Вы успешно вошли") navigate("/home");
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });

        console.log(username, password)
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
                Вход в аккаунт
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Войдите, чтобы использовать все возможности нашей платформы.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="Логин"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
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
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: "#4b866e" }}
                    onClick={login}
                >
                    Войти
                </Button>
                <Typography variant="body2" align="center">
                    Нет аккаунта?{' '}
                    <Button
                        component={Link}
                        to="register"
                        color="primary"
                        sx={{ textTransform: 'none', p: 0, ml: 0.5 }}
                    >
                        Зарегистрируйтесь
                    </Button>
                </Typography>
            </Box>
            <Snackbar
                open={true}
                autoHideDuration={2000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>Ошибка</AlertTitle>
                    Возникла ошибка авторизации.
                </Alert>
            </Snackbar>
        </Container>
    );
};
