import { Alert, AlertTitle, Box, Button, Container, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
	const [passwordsNotMatchingError, setPasswordsNotMatchingError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = () => {

		if (username === "" || password === "" || confirmPassword === "") {
			setMessage("Неободимо заполнить все поля")
			setPasswordsNotMatchingError(true)
			return;
		}

		if (password !== confirmPassword) {
			setMessage("Пароли не совпадают. Проверьте правильность паролей")
			setPasswordsNotMatchingError(true)
			return;
		}

		if (password.length < 8) {
			setMessage("Пароль должен быть длинной от 8 символов")
			setPasswordsNotMatchingError(true)
			return;
		}

		fetch('https://flaskoprserver-production.up.railway.app/create_user', {
		// fetch('https://python-patient-solely.ngrok-free.app/create_user', {
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
				console.log(data)

				if (data["message"] === "Аккаунт успешно создан") {
					setUser(data['id'])
					navigate("/home")
				} else {
					setMessage(data["message"])
					setPasswordsNotMatchingError(true)
				};
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
			});

		console.log(username, password);
	}

	useEffect(() => {
		const id = localStorage.getItem("user");
		if (id) navigate("../../home")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleErrorClose = () => {
		setPasswordsNotMatchingError(false)
	}

	const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

	const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
				<TextField
					fullWidth
					label="Подтвердите пароль"
					variant="outlined"
					type={showConfirmPassword ? "text" : "password"}
					margin="normal"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={toggleConfirmPasswordVisibility}
									edge="end"
									aria-label="toggle password visibility"
								>
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
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
					<AlertTitle>Ошибка регистрации</AlertTitle>
					{message}
				</Alert>
			</Snackbar>
		</Container>
	)
}