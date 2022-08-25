import styles from "./Navbar.module.scss";
import { useParams } from "react-router-dom";
import SearchInput from "../SearchInput";
import icon from "../../../assets/icon.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Fragment } from "react";

const Navbar = (props) => {
	const { id } = useParams();
	return (
		<Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{id ? `Company: ${id.toUpperCase()}` : "Market Masters"}</title>
				<link
					rel="canonical"
					href="
					https://marketmasters.netlify.app/"
				/>
			</Helmet>
			<section className={styles["navbar"]}>
				<nav>
					<Link to={"/"}>
						<img src={icon} alt="website icon" />
					</Link>
					{id && <SearchInput direction={props.direction} />}
				</nav>
			</section>
		</Fragment>
	);
};

export default Navbar;
