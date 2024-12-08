import { Alert, AlertTitle, Box, Button, Container, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface LoginProps {
	setUser: (id: string) => void
}

export default function Login({ setUser }: LoginProps) {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordsNotMatchingError, setPasswordsNotMatchingError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);

	const login = () => {

		if (username === "") {
			setMessage("Необходимо ввести имя пользователя")
			setPasswordsNotMatchingError(true)
			return;
		}

		if (password === "") {
			setMessage("Введите пароль")
			setPasswordsNotMatchingError(true)
			return;
		}

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

				if (data["message"] === "Вы успешно вошли") {
					setUser(data['id'])
					navigate("/home");
				} else {
					setMessage(data["message"])
					setPasswordsNotMatchingError(true)
				}
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});

		console.log(username, password)
	}

	useEffect(() => {
		const id = localStorage.getItem("user");
		if (id) navigate("../home")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleErrorClose = () => {
		setPasswordsNotMatchingError(false)
	}

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

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
					type={showPassword ? "text" : "password"}
					margin="normal"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={togglePasswordVisibility}
									edge="end"
									aria-label="toggle password visibility"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
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
				open={passwordsNotMatchingError}
				autoHideDuration={1500}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={handleErrorClose}
			>
				<Alert
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					<AlertTitle>Ошибка авторизации</AlertTitle>
					{message}
				</Alert>
			</Snackbar>
		</Container>
	);
};
