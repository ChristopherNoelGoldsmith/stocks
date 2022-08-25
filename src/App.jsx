import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes, useParams } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import URLContextProvider from "./context/context";

function App() {
	return (
		<Fragment>
			<URLContextProvider>
				<div className="App">
					<div className="bg"></div>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path={`/stock/:id`} element={<ProductPage />} />
					</Routes>
				</div>
			</URLContextProvider>
		</Fragment>
	);
}

export default App;
