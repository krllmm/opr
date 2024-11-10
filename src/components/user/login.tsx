import { Button, Divider, FormControl, TextField, Typography } from "@mui/material"
import { useState } from "react";

export const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        console.log(username, password);
    }

    return (
        <>
            <Typography variant="h5">Крутой сайт</Typography>
            <Divider sx={{ marginBlock: "8px" }}/>
            <FormControl sx={{ gap: "12px" }}>
                <Typography>Логин</Typography>
                <TextField size="small" value={username} placeholder="Логин" onChange={e => setUsername(e.target.value)}></TextField>
                <Typography>Пароль</Typography>
                <TextField type="password" size="small" value={password} placeholder="Пароль" onChange={e => setPassword(e.target.value)}></TextField>

                <Button onClick={handleSubmit} variant="contained">Войти</Button>
            </FormControl>
        </>
    )
}