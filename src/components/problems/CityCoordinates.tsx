import { useState, ChangeEvent } from 'react';
import { TextField, Button, IconButton, Box, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { SxProps, Theme } from "@mui/material";

export interface City {
    x: string;
    y: string;
}

interface CityCoordinatesProps {
    solve: (cities: City[], populationSize: number, generations: number) => void
    sx?: SxProps<Theme>;
}

function CityCoordinates({ solve, sx }: CityCoordinatesProps) {
    const [cities, setCities] = useState<City[]>([{ x: '', y: '' }]);
    const [populationSize, setPopulationSize] = useState<number>(10);
    const [generations, setGenerations] = useState(10)

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedCities = [...cities];
        updatedCities[index][name as keyof City] = value;
        setCities(updatedCities);
    };

    const addCity = () => {
        setCities([...cities, { x: '', y: '' }]);
    };

    const removeCity = (index: number) => {
        const updatedCities = cities.filter((_, i) => i !== index);
        setCities(updatedCities);
    };

    return (
        <Box sx={{ ...sx, marginInline: "auto", paddingInline: 1 }}>
            <Divider textAlign="left" sx={{ mb: 1.4 }}>Настройки входных данных</Divider>
            <Button variant="contained" sx={{ width: "100%", backgroundColor: "#4b866e", my: 2 }} onClick={addCity}>
                Добавить город
            </Button>
            {cities.map((city, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        marginBottom: 2,
                    }}
                >
                    <TextField
                        label="X координата"
                        type="number"
                        size="small"
                        name="x"
                        variant="outlined"
                        value={city.x}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <TextField
                        label="Y координата"
                        type="number"
                        size="small"
                        name="y"
                        variant="outlined"
                        value={city.y}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <IconButton color="error" onClick={() => removeCity(index)}>
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <Divider textAlign="left" sx={{ mb: 1.4 }}>Настройки алгоритма</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Количество поколений"
                    type="number"
                    name="numericValue"
                    variant="outlined"
                    size="small"
                    value={generations}
                    onChange={(e) => setGenerations(+e.target.value)}
                />
                <FormControl variant="outlined">
                    <InputLabel>Размер популяции</InputLabel>
                    <Select
                        label="Размер популяции"
                        size="small"
                        value={populationSize}
                        onChange={(e) => setPopulationSize(+e.target.value)}
                    >
                        {[10, 20, 30, 40, 50].map((option) => (
                            <MenuItem key={option} value={option.toString()}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button sx={{ backgroundColor: "#4b866e" }} onClick={() => solve(cities, populationSize, generations)} variant="contained">Решить задачу</Button>
            </Box>
        </Box>
    );
}

export default CityCoordinates;
