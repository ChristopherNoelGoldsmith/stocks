import styles from "./HomePage.module.scss";
import Navbar from "../components/UI/Navbar/Navbar";
import { Fragment, useContext } from "react";
import SearchInput from "../components/UI/SearchInput";
import { UrlContext } from "../context/context";

const HomePage = () => {
	return (
		<Fragment>
			<Navbar />
			<section className={styles["homepage"]}>
				<section className={styles["title"]}></section>
				<section className={styles["input-container"]}>
					<SearchInput direction={"column"} />
				</section>
			</section>
		</Fragment>
	);
};

export default HomePage;
