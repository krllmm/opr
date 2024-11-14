import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import { Start } from "./components/Start"
import { NotFound } from "./components/NotFound"
import Tsp from "./components/problems/Tsp"
import { Login } from "./components/user/Login"
import { Register } from "./components/user/Register"
import { UserComponent } from "./components/user/UserComponent"
import { Info } from "./components/Info"
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext("")

function App() {

	const [userId, setUserId] = useState("");

	const setUser = (id: string) => {
		setUserId(id)
		localStorage.setItem('user', id);
	}

	return (
		<>
		<UserContext.Provider value={userId}>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/user" element={<UserComponent />} >
					<Route index element={<Login setUser={setUser} />} />
					<Route path="register" element={<Register setUser={setUser} />} />
				</Route>

				<Route path="/home" element={<Main />}>
					<Route index element={<Start />} />
					<Route path="tsp" element={<Tsp />} />
					<Route path="info" element={<Info />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</UserContext.Provider>
			
		</>
	)
}

export default App
