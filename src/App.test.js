import App from "./App";
import Router, { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Routers } from "react-router-dom";

test("tests to see if App.jsx renders", () => {
	render(
		<Routers>
			<App />
		</Routers>
	);
});
