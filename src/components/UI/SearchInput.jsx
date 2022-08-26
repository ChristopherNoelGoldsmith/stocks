import styles from "./SearchInput.module.scss";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { useContext } from "react";
import { UrlContext } from "../../context/context";
const DUMMY_DATA = {
	tickerInput: "COMPANY NAME OR TICKER",
};

const SearchInput = (props) => {
	const navigate = useNavigate();
	const query = useQuery();
	const { urlContextReducer, URL_TYPES } = useContext(UrlContext);
	//HANDLES THE SEACH INPUT ON ANY PAGE TO REDIRECT TO STOCK TICKER PAGE;
	const searchHanlder = async (event) => {
		event.preventDefault();
		const [target] = event.target;

		if (!target.value) return;

		urlContextReducer({ type: URL_TYPES.STOCK, urlString: target.value });
	};

	return (
		<form className={styles[props.direction]} onSubmit={searchHanlder}>
			<input type="text" placeholder={DUMMY_DATA.tickerInput} />
			<button>SEARCH</button>
		</form>
	);
};

export default SearchInput;
