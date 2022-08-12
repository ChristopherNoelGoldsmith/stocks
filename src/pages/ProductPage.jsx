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

//TODO: PEERS /stock/peers?symbol=AAPL
const ProductPage = () => {
	const [ticker, setTicker] = useState();
	const [earningsData, setEarnings] = useState();
	const [profileData, setProfile] = useState();
	const [peersData, setPeers] = useState([]);
	const { id: rawId } = useParams();
	const id = rawId.toUpperCase();
	const query = useQuery();

	const peersListReducer = async (peers) => {
		const createPeersList = peers
			.sort(() => Math.random() - 0.5)
			.map(async (peer, index) => {
				if (index < 0 || index > 3) return;
				const fields = { symbol: peer };
				const ticker = await query("prices", fields);
				const profileData = await query("profile", fields);
				console.log(ticker, profileData);
				if (!ticker.o) return;
				return (
					<li>
						<TickerInfo
							key={Math.random() * 100000}
							ticker={ticker}
							profileData={profileData}
							id={peer}
						/>
					</li>
				);
			});
		const list = await Promise.all(createPeersList);
		console.log(list);
		setPeers(list);
	};

	useEffect(() => {
		const fields = { symbol: id };
		const reqAPI = async () => {
			const price = await query("prices", fields);
			const profile = await query("profile", fields);
			const earnings = await query("earnings", fields);
			const peers = await query("peers", fields);
			if (!price || !earnings || !profile) return setTicker("NOT FOUND!");
			await peersListReducer(peers);
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
					<Peers peersData={peersData} />
				</section>
			) : null}
		</Fragment>
	);
};

export default ProductPage;
