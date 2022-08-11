import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";

const DUMMY_DATA = {
	tickerInput: "MSFT",
};

const HomePage = () => {
	const navigate = useNavigate();

	const searchHanlder = (event) => {
		event.preventDefault();
		const [target] = event.target;
		navigate(`stock/${target.value}`);
	};

	return (
		<section className={styles["homepage"]}>
			<section className={styles["title"]}></section>
			<section className={styles["input-container"]}>
				<form onSubmit={searchHanlder}>
					<h3>Enter a ticker symbol!</h3>
					<input type="text" placeholder={DUMMY_DATA.tickerInput} />
					<button>SEARCH</button>
				</form>
			</section>
		</section>
	);
};

export default HomePage;
