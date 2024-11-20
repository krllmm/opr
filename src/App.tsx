import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import { Start } from "./components/Start"
import { NotFound } from "./components/NotFound"
import Tsp from "./components/problems/Tsp"
import Login from "./components/user/login"
import Register from "./components/user/register"
import UserComponent from "./components/user/userComponent"
import { Info } from "./components/Info"
import { createContext, useState } from "react";
import Kp from "./components/problems/kp/Kp"
import History from "./components/user/history"

interface UserContextType {
    userId: string;
    logout: () => void;
  }

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(undefined)

function App() {
    const navigate = useNavigate()

	const [userId, setUserId] = useState("");

	const setUser = (id: string) => {
		setUserId(id)
		localStorage.setItem('user', id);
	}

    const logout = () => {
        setUserId("")
		localStorage.removeItem('user');
        navigate("/")
    }

	return (
		<>
		<UserContext.Provider value={{userId, logout}}>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/user" element={<UserComponent />} >
					<Route index element={<Login setUser={setUser} />} />
					<Route path="register" element={<Register setUser={setUser} />} />
				</Route>

				<Route path="/home" element={<Main />}>
					<Route index element={<Start />} />
					<Route path="tsp" element={<Tsp />} />
					<Route path="kp" element={<Kp />} />
                    <Route path="history" element={<History />} />
					<Route path="info" element={<Info />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</UserContext.Provider>
			
		</>
	)
}

export default App
