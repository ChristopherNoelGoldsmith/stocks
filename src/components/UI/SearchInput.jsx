import styles from "./SearchInput.module.scss";
import { useContext } from "react";
import { UrlContext } from "../../context/context";
import useInput from "../../hooks/useInput";

const DUMMY_DATA = {
	tickerInput: "COMPANY NAME OR TICKER",
};

const SearchInput = (props) => {
	const { urlContextReducer, URL_TYPES } = useContext(UrlContext);
	const { inputState, inputHandler } = useInput();

	const searchBarHandler = (event) => {
		inputHandler({ type: "SEARCH", data: event.target.value });
		return;
	};

	//HANDLES THE SEACH INPUT ON ANY PAGE TO REDIRECT TO STOCK TICKER PAGE;
	const searchHanlder = async (event) => {
		event.preventDefault();
		if (!inputState.SEARCH) return;
		urlContextReducer({ type: URL_TYPES.STOCK, urlString: inputState.SEARCH });
		inputHandler({ type: "SEARCH", data: "" });
	};

	return (
		<form
			aria-label={"form"}
			className={styles[props.direction]}
			onSubmit={searchHanlder}
		>
			<input
				type="text"
				id={"search"}
				name={"search"}
				onChange={searchBarHandler}
				value={inputState?.SEARCH || ""}
				placeholder={DUMMY_DATA.tickerInput}
			/>
			<button aria-label={"button"}>SEARCH</button>
		</form>
	);
};

export default SearchInput;
