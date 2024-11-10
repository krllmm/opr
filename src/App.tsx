import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import { Start } from "./components/Start"
import UserComponent from "./components/user/userComponent"
import { NotFound } from "./components/NotFound"
import Tsp from "./components/problems/Tsp"
import { Login } from "./components/user/login"
import { Register } from "./components/user/register"
import { Info } from "./components/Info"

function App() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Home />} />

            <Route path="/user" element={<UserComponent />} >
                <Route index element={<Login />}/>
                <Route path="register" element={<Register />}/>
            </Route>

			<Route path="/home" element={<Main />}>
				<Route index element={<Start />} />
				<Route path="tsp" element={<Tsp />} />
                <Route path="info" element={<Info />}/>
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Routes>
		</>
	)
}

export default App
