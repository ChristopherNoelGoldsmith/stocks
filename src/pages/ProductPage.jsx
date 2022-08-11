import styles from "./ProductPage.module.scss";
import Card from "../components/UI/Card";
import { useParams } from "react-router-dom";

const DUMMY_DATA = {
	actual: 2.56,
	estimate: 2.38,
	period: "2019-03-31",
	symbol: "AAPL",
};

const ProductPage = () => {
	const { id } = useParams();
	console.log(id);
	return (
		<section className={styles["product-page"]}>
			<figure>
				<label htmlFor="symbol" className={styles["ticker"]}>
					{DUMMY_DATA.symbol}
				</label>
				<div className={styles["price"]}>
					<span bottom={DUMMY_DATA.period}>{DUMMY_DATA.estimate}</span>
				</div>
			</figure>
		</section>
	);
};

export default ProductPage;
