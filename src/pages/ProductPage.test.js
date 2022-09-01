import { render } from "@testing-library/react";
import ProductPage from "./ProductPage";
//import peersListReducer from "./productPage";

const DUMMY_DATA = {
	peers: ["MSFT", "AAPL", "MO"],
};
//learn async testing today
describe("the functions used in the ProductPage component", async () => {
	//	await peersListReducer(DUMMY_DATA.peers);

	test("render of the main product page", () => {
		render(<ProductPage />);
	});
});
