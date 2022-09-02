import { renderHook, act } from "@testing-library/react";
import useInput from "./useInput";

describe("useInput hook", () => {
	test("single input with use input", () => {
		const { result } = renderHook(() => useInput());

		const inputObject = { type: "SEARCH", data: "MSFT" };

		act(() => result.current.inputHandler(inputObject));

		const inputState = result.current.inputState;

		expect(inputState.SEARCH).toContain(inputObject.data);
		return;
	});

	test("multiple inputs with use input", () => {
		const { result } = renderHook(() => useInput());

		const inputObject = [
			{ type: "SUBMIT", data: "AAPL" },
			{ type: "SEARCH", data: "MSFT" },
		];
		act(() => result.current.inputHandler(inputObject[0]));
		act(() => result.current.inputHandler(inputObject[1]));

		const inputState = result.current.inputState;
		console.log(inputState);

		expect(inputState.SUBMIT).toContain(inputObject[0].data);
		expect(inputState.SEARCH).toContain(inputObject[1].data);
		return;
	});
});
