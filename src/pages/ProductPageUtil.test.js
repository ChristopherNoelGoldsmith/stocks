import { checkCompanyName } from "./productPageUtil";
//import peersListReducer from "./productPage";

const DUMMY_DATA = {
	peers: ["MSFT", "AAPL", "MO"],
};
//learn async testing today
test("company name", () => {
	expect(checkCompanyName("microsoft")).toBe("MSFT");
	expect(checkCompanyName("poopp")).toBe("WHR");
	expect(checkCompanyName(100)).toBe(false);
	expect(checkCompanyName([])).toBe(false);
	expect(checkCompanyName("njlnkjnkjnkjnkj")).toBe(false);
});
