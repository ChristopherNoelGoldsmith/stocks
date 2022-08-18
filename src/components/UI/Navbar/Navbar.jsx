import styles from "./Navbar.module.scss";
import { useParams } from "react-router-dom";
import SearchInput from "../SearchInput";
import icon from "../../../assets/icon.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	const { id } = useParams();
	return (
		<section className={styles["navbar"]}>
			<nav>
				<Link to={"/"}>
					<img src={icon} alt="website icon" />
				</Link>
				{id && <SearchInput direction={props.direction} />}
			</nav>
		</section>
	);
};

export default Navbar;
