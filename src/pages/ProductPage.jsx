import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Earnings from "../components/Charts/Earnings";
import PriceHistory from "../components/Charts/PriceHistory";
import useQuery from "../hooks/useQuery";
import Navbar from "../components/UI/Navbar/Navbar";
import TickerInfo from "../components/TickerInfo/TickerInfo";
import Profile from "../components/Profile/Profile";
import Peers from "../components/Peers/Peers";
import LoadingBar from "../components/UI/LoadingBar";
import { checkCompanyName } from "../hooks/useQuery";
import { useContext } from "react";
import { UrlContext } from "../context/context";

const ProductPage = () => {
	const [ticker, setTicker] = useState();
	const [earningsData, setEarnings] = useState();
	const [profileData, setProfile] = useState();
	const [tickerName, setTickerName] = useState("ERROR");
	const [peersData, setPeers] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [candle, setCandle] = useState();
	const [numberOfQueries, setNumberOfQueries] = useState(0);
	const { id: rawId } = useParams();
	const { urlContextReducer, URL_TYPES } = useContext(UrlContext);
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
		const reqAPI = async (data) => {
			setLoaded(false);
			// API CALLS ) CALLS ALL DATA FROM PARTS OF THE API TO CREATE THE PROFILE PAGE
			const price = await query("prices", data);
			const profile = await query("profile", data);
			const earnings = await query("earnings", data);
			const peers = await query("peers", data);
			const candle = await query("candle", {
				symbol: id,
				from: Math.round(new Date().getTime() / 1000) - 60 * 60 * 24 * 30,
				to: Math.round(new Date().getTime() / 1000),
			});

			// ERROR HANDLING 1 ) IF ANY OF THE API CALLS RETURN FALSE IT RETURNS THE FUNCTION
			if (!price || !earnings || !profile || !peers || !candle) {
				const newSymbol = checkCompanyName(data.symbol, numberOfQueries);
				setNumberOfQueries((num) => num + 1);

				// ERROR HANDLING 2 ) REDIRECTS TO HOME PAGE AFTER 3 UNSUCCESSFUL QUERIES ARE MADE ON THE NAME OF A COMPANY OR TICKER
				if (newSymbol === "REDIRECT") {
					await urlContextReducer({
						type: newSymbol,
					});
					return;
				}

				await urlContextReducer({
					type: URL_TYPES.STOCK,
					urlString: newSymbol || data.symbol, //ERROR HANDLING 3 ) IF NEW SYMBOL IS FALSE, ORIGINAL SYMBOL IS USED
				});
				return;
			}
			// CREATES LIST )
			await peersListReducer(peers);

			//SETS THE STATES )
			setTickerName(id);
			setProfile(profile);
			setEarnings(earnings);
			setTicker(price);
			setCandle(candle);
			setNumberOfQueries(0);
			return setLoaded(true);
		};
		reqAPI(fields);
	}, [id]);

	return (
		<Fragment>
			<Navbar direction={"row"} />

			{loaded ? (
				<section className={styles["product-page"]}>
					<section className={styles["product"]}>
						<TickerInfo
							profileData={profileData}
							id={tickerName}
							ticker={ticker}
						/>
						<section className={styles["earnings"]}>
							<PriceHistory data={candle} />
							<Earnings earningsData={earningsData} />
						</section>
						<section>
							<Profile profileData={profileData} />
						</section>
					</section>
					<Peers peersData={peersData} />
				</section>
			) : (
				<LoadingBar />
			)}
		</Fragment>
	);
};

export default ProductPage;
