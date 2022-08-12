import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
	return (
		<div className="App">
			<div className="bg"></div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path={`/stock/:id`} element={<ProductPage />} />
			</Routes>
		</div>
	);
}

export default App;
