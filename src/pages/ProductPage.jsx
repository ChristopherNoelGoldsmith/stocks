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
	const [queryData, setQueryData] = useState();
	const [tickerName, setTickerName] = useState("ERROR");
	const [peersData, setPeers] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [loadingFailure, setLoadingFailure] = useState(false);
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
		const fields = {
			symbol: id,
			from: Math.round(new Date().getTime() / 1000) - 60 * 60 * 24 * 30,
			to: Math.round(new Date().getTime() / 1000),
		};
		const reqAPI = async (data) => {
			setLoaded(false);
			// API CALLS ) USES STRINGS TO DIRECT CALLS TO THE API, THEN RETURN AN OBJECT CONTAINING
			//THE RESULTS OF THE QUERIES WITH THE COORISPONDING STRINGS AS KEYS
			const queryStrings = ["prices", "profile", "earnings", "peers", "candle"];

			const queryData = await query(queryStrings, data);
			// ERROR HANDLING 1 ) IF ANY OF THE API CALLS RETURN FALSE IT RETURNS THE FUNCTION
			if (!queryData.profile) {
				const newSymbol = checkCompanyName(data.symbol);

				//ERROR HANDLING 2 ) REDIRECTS IF NEW SYMBOL IS ALSO INVALID
				if (!newSymbol) {
					setLoadingFailure(true);

					//EXPERIENCE 1 ) setTimeout IS USED TO ENSURE THE USER CAN SEE THE ERROR MESSAGE
					// WHEN THEY ENTER AN INVALID COMPANY NAME OR TICKER SYMBOL

					setTimeout(async () => {
						await urlContextReducer({
							type: URL_TYPES.HOME,
							urlString: "", //ERROR HANDLING 2 ) IF NEW SYMBOL IS FALSE, ORIGINAL SYMBOL IS USED
						});
					}, 1000);
					return;
				}

				await urlContextReducer({
					type: URL_TYPES.STOCK,
					urlString: newSymbol,
				});
				return;
			}
			// CREATES LIST )
			if (queryData.peers) {
				await peersListReducer(queryData.peers);
			}

			//SETS THE STATES )
			setTickerName(id);
			setQueryData(queryData);
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
							profileData={queryData?.profile}
							id={tickerName}
							ticker={queryData?.prices}
						/>
						<section className={styles["earnings"]}>
							<PriceHistory data={queryData?.candle} />
							<Earnings earningsData={queryData?.earnings} />
						</section>
						<section>
							<Profile profileData={queryData?.profile} />
						</section>
					</section>
					{peersData && <Peers peersData={peersData} />}
				</section>
			) : (
				<LoadingBar fail={loadingFailure} />
			)}
		</Fragment>
	);
};

export default ProductPage;
