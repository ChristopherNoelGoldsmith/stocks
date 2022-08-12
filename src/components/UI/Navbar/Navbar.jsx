import styles from "./Navbar.module.scss";
import { useParams } from "react-router-dom";
import SearchInput from "../SearchInput";

const Navbar = (props) => {
	const { id } = useParams();
	return (
		<section className={styles["navbar"]}>
			<nav>
				{id ? (
					<SearchInput direction={props.direction} />
				) : (
					<h1>"Wecome to Neon Market!"</h1>
				)}
			</nav>
		</section>
	);
};

export default Navbar;
