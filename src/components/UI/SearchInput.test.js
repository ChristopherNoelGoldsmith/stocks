import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchInput from "./SearchInput";
import userEvent from "@testing-library/user-event";
describe("<SearchInput/>", () => {
	// REDNERING TEST 1 )

	test("renders", () => {
		const barDirections = ["vertical", "horizontal", ""];

		const searchRenders = barDirections.forEach((dir) => {
			render(<SearchInput direction={dir} />);
		});
	});

	const setup = () => {
		render(
			<BrowserRouter>
				<SearchInput />
			</BrowserRouter>
		);

		const form = screen.getByRole("form", { name: /form/i });
		const input = screen.getByRole("textbox");

		return {
			form,
			input,
		};
	};

	test("input text into form", () => {
		const { form, input } = setup();

		const text = "MSFT";
		userEvent.type(input, text);

		expect(form).toHaveFormValues({
			search: text,
		});
	});
});
