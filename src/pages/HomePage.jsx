import styles from "./HomePage.module.scss";
import Navbar from "../components/UI/Navbar/Navbar";
import { Fragment, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import useRec from "../hooks/useRec";

const DUMMY_DATA = [
	"MSFT",
	"AAPL",
	"WMT",
	"COST",
	"MO",
	"LMT",
	"KO",
	"BO",
	"JYNT",
	"TGT",
	"SCHW",
];

const HomePage = () => {
	const [rec, setRec] = useRec();

	useEffect(() => {
		const rando = Math.floor(Math.random() * DUMMY_DATA.length);
		const recommended = DUMMY_DATA.filter((stocks, index) => {
			if (index >= rando - 4 && index <= rando) return true;
			return false;
		}); //.map((stocks) => stocks["ACT Symbol"]);
		setRec(recommended);
	}, []);

	return (
		<Fragment>
			<Navbar />
			<section className={styles["homepage"]}>
				<section className={styles["title"]}></section>
				<section className={styles["input-container"]}>
					<SearchInput direction={"column"} />
				</section>
				{rec ? <ul>{rec}</ul> : ""}
			</section>
		</Fragment>
	);
};

export default HomePage;
