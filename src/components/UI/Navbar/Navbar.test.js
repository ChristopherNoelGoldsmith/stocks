import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("<Navbar/> ", () => {
	test("render", () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
	});
});
