import styles from "./SearchInput.module.scss";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA = {
	tickerInput: "COMPANY NAME OR TICKER",
};

const SearchInput = (props) => {
	const navigate = useNavigate();

	//HANDLES THE SEACH INPUT ON ANY PAGE TO REDIRECT TO STOCK TICKER PAGE;
	const searchHanlder = (event) => {
		event.preventDefault();
		const [target] = event.target;
		if (!target.value) return;
		navigate(`../stock/${target.value}`, { replace: true });
	};

	return (
		<form className={styles[props.direction]} onSubmit={searchHanlder}>
			<input type="text" placeholder={DUMMY_DATA.tickerInput} />
			<button>SEARCH</button>
		</form>
	);
};

export default SearchInput;
