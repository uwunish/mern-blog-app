import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="app-container">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-blog" element={<AddBlog />} />
			</Routes>
		</div>
	);
}

export default App;
