import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import { NotFound } from "./components/NotFound"
import Tsp from "./components/problems/Tsp"

function App() {
	return (
		<>
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/home" element={<Sidebar />}>
				<Route index element={<Main />} />
				<Route path="tsp" element={<Tsp />} />
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Routes>
		</>
	)
}

export default App
