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
import LoadingBar from "../components/UI/LoadingBar";

const ProductPage = () => {
	const [ticker, setTicker] = useState();
	const [earningsData, setEarnings] = useState();
	const [profileData, setProfile] = useState();
	const [tickerName, setTickerName] = useState("poop");
	const [peersData, setPeers] = useState([]);
	const { id: rawId } = useParams();
	const id = rawId.toUpperCase();
	const query = useQuery();

	const peersListReducer = async (peers) => {
		//LIST CREATION 1 ) RANDOMIZE LIST THEN CREATE NEW LIST WITH ARR METHODS
		const createPeersList = peers
			.sort(() => Math.random() - 0.5)
			.map(async (peer, index) => {
				//LIMIT 1 ) LIMITS THE NUMBER OF RECCOMENDED ITEMS CREATED FROM THE LIST THE API GIVES
				if (index < 0 || index > 3) return;

				//LIST CREATION 2 ) API CALLS TO FOR THE DATA
				const fields = { symbol: peer };
				const ticker = await query("prices", fields);
				const profileData = await query("profile", fields);

				//ERROR HANDLING 1 ) RETURNS IF VALUES RETURN AS FALSE FROM THE API
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

		//LIST CREATION 3 ) RESOLVES ALL PROMISES IN THE ARRAY GENERATED ABOVE;
		const list = await Promise.all(createPeersList);

		//LIST CREATION 4 ) SETS LIST TO THE STATE
		setPeers(list);
	};

	/*
///////////////////////////////////////////////////////////	
	THIS useEffect HOOK IS WHAT POPULATES THE PRODUCT PAGE.
	IT MAKES EACH QUERY AND PLUGS THE VALUES IN WITH THE 
	useState HOOK

	A RERENDER IS TRIGGERED WHENEVER THE :id PARAM OF THE 
	URL CHANGES
///////////////////////////////////////////////////////////
	*/
	useEffect(() => {
		const fields = { symbol: id };
		const reqAPI = async () => {
			// API CALLS ) CALLS ALL DATA FROM PARTS OF THE API TO CREATE THE PROFILE PAGE
			const price = await query("prices", fields);
			const profile = await query("profile", fields);
			const earnings = await query("earnings", fields);
			const peers = await query("peers", fields);

			// ERROR HANDLING ) IF ANY OF THE API CALLS RETURN FALSE IT RETURNS THE FUNCTION
			if (!price || !earnings || !profile || !peers)
				return setTicker("NOT FOUND!");

			// CREATES LIST )
			await peersListReducer(peers);

			//SETS THE STATES )
			setTickerName(id);
			setProfile(profile);
			setEarnings(earnings);
			return setTicker(price);
		};
		reqAPI();
	}, [id]);

	return (
		<Fragment>
			<Navbar direction={"row"} />

			<section className={styles["product-page"]}>
				<section className={styles["product"]}>
					<TickerInfo
						profileData={profileData}
						id={tickerName}
						ticker={ticker}
					/>
					<section className={styles["earnings"]}>
						<Earnings earningsData={earningsData} />
					</section>
					<section>
						<Profile profileData={profileData} />
					</section>
				</section>
				<Peers peersData={peersData} />
			</section>
		</Fragment>
	);
};

export default ProductPage;
