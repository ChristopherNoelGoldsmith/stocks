import styles from "./ProductPage.module.scss";
import Card from "../components/UI/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Earnings from "../components/Earnings/Earnings";
import useQuery from "../hooks/useQuery";
import Navbar from "../components/UI/Navbar/Navbar";
import TickerInfo from "../components/TickerInfo/TickerInfo";
import Profile from "../components/Profile/Profile";
import Peers from "../components/Peers/Peers";

const DUMMY_DATA = {
	c: 2.56,
	h: 12.38,
	l: 1.13,
	symbol: "AAPL",
};
//TODO: PEERS /stock/peers?symbol=AAPL
const ProductPage = () => {
	const [ticker, setTicker] = useState();
	const [earningsData, setEarnings] = useState();
	const [profileData, setProfile] = useState();
	const { id: rawId } = useParams();
	const id = rawId.toUpperCase();
	const query = useQuery();

	useEffect(() => {
		const fields = { symbol: id };
		const reqAPI = async () => {
			const price = await query("prices", fields);
			const profile = await query("profile", fields);
			const earnings = await query("earnings", fields);
			console.log(profile);
			if (!price || !earnings || !profile) return setTicker("NOT FOUND!");
			setProfile(profile);
			setEarnings(earnings);
			return setTicker(price);
		};
		reqAPI();
	}, [id]);

	return (
		<Fragment>
			<Navbar direction={"row"} />
			{ticker && profileData ? (
				<section className={styles["product-page"]}>
					<section className={styles["product"]}>
						<TickerInfo profileData={profileData} id={id} ticker={ticker} />
						<section className={styles["earnings"]}>
							<Earnings earningsData={earningsData} />
						</section>
						<section>
							<Profile profileData={profileData} />
						</section>
					</section>
					<Peers profileData={profileData} /> />
				</section>
			) : null}
		</Fragment>
	);
};

export default ProductPage;
