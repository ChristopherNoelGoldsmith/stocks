import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";

function App() {
	return (
		<Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Market Masters</title>
				<link
					rel="canonical"
					href="
					https://marketmasters.netlify.app/"
				/>
			</Helmet>
			<div className="App">
				<div className="bg"></div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path={`/stock/:id`} element={<ProductPage />} />
				</Routes>
			</div>
		</Fragment>
	);
}

export default App;
