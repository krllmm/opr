import { AppBar, Toolbar, Button, Typography, CssBaseline, Box, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";


// Создаем тему с указанными цветами
const theme = createTheme({
	palette: {
		background: {
			default: '#c0c0c0',
		},
		primary: {
			main: '#4b866e',
		},
		secondary: {
			main: '#ffffff',
		},
	},
	typography: {
		button: {
			textTransform: 'none', // Отключаем uppercase для кнопок
		},
	},
});

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* Верхнее меню */}
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="primary">
					<Toolbar>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Задачи оптимизации
						</Typography>
						<Button color="secondary" variant="outlined" sx={{ mx: 1 }} component={Link} to="/user">
							Вход
						</Button>
						<Button color="secondary" variant="contained" component={Link} to="/user/register">
							Регистрация
						</Button>
					</Toolbar>
				</AppBar>
			</Box>

			{/* Главный контент */}
			<Container
				maxWidth="lg"
				sx={{
					mt: 4,
					p: 4,
					bgcolor: '#f9f9f9',
					borderRadius: 2,
					boxShadow: 2,
				}}
			>
				{/* Приветствие */}
				<Typography variant="h4" gutterBottom color="primary">
					Добро пожаловать на платформу оптимизации!
				</Typography>
				<Typography variant="body1" paragraph>
					Решайте сложные задачи оптимизации легко и эффективно. Наша платформа поможет вам найти оптимальные решения для ваших проектов.
				</Typography>
				<Box
					component="img"
					src="/images/team.jpg"
					alt="Оптимизация"
					sx={{
						width: '100%',
						borderRadius: 14,
						mb: 4,
						'@media (max-width:550px)': {
							borderRadius: 8,
						},
					}}
				/>

				{/* Секция 1: Потребности */}
				<Grid container spacing={4}>
					<Grid item xs={12} md={7}>
						<Typography variant="h5" gutterBottom color="primary">
							Почему оптимизация важна?
						</Typography>
						<Typography variant="body1">
							Оптимизация помогает минимизировать затраты, улучшить производительность и принимать более эффективные решения. Это необходимо в таких областях, как логистика, производство, управление ресурсами и многое другое.
						</Typography>
					</Grid>
					<Grid item xs={12} md={5}>
						<Box
							component="img"
							src="/images/productivity.jpg"
							alt="Потребности"
							sx={{
								width: '100%',
								borderRadius: 14,
								'@media (max-width:550px)': {
									borderRadius: 8,
								},
							}}
						/>
					</Grid>
				</Grid>

				{/* Секция 2: Преимущества
        <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 6 }}>
          Преимущества нашей платформы
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary">
              Простота использования
            </Typography>
            <Typography variant="body2">
              Интуитивно понятный интерфейс, который подходит как для начинающих, так и для экспертов.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary">
              Высокая точность
            </Typography>
            <Typography variant="body2">
              Наши алгоритмы гарантируют точные результаты в кратчайшие сроки.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary">
              Широкий спектр задач
            </Typography>
            <Typography variant="body2">
              Подходит для решения линейных, нелинейных, многокритериальных задач оптимизации.
            </Typography>
          </Grid>
        </Grid> */}

				{/* Призыв к действию */}
				<Box
					sx={{
						mt: 6,
						p: 4,
						textAlign: 'center',
						bgcolor: 'primary.main',
						color: 'secondary.main',
						borderRadius: 2,
					}}
				>
					<Typography variant="h5" gutterBottom>
						Готовы начать?
					</Typography>
					<Typography variant="body1" gutterBottom>
						Зарегистрируйтесь сейчас и начните решать задачи оптимизации уже сегодня!
					</Typography>
					<Button variant="contained" color="secondary" component={Link} to="/user/register">
						Регистрация
					</Button>
				</Box>
			</Container>

			{/* Подвал */}
			<Box
				sx={{
					mt: 8,
					py: 4,
					textAlign: 'center',
					bgcolor: 'primary.main',
					color: 'secondary.main',
				}}
			>
				<Typography variant="body2">
					© 2024 Платформа оптимизации. Все права защищены.
				</Typography>
				<Typography variant="body2" sx={{ mt: 1 }}>
					<Button color="secondary" sx={{ mx: 1 }}>
						О нас
					</Button>
					<Button color="secondary" sx={{ mx: 1 }}>
						Контакты
					</Button>
					<Button color="secondary" sx={{ mx: 1 }}>
						Политика конфиденциальности
					</Button>
				</Typography>
			</Box>
		</ThemeProvider>
	);
};
