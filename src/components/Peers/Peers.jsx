import styles from "./Peers.module.scss";
import TickerInfo from "../TickerInfo/TickerInfo";
import { useState, useReducer } from "react";
import useQuery from "../../hooks/useQuery";
import { useEffect } from "react";

const Peers = (props) => {
	const [peersList, setPeersList] = useState([]);

	const query = useQuery();

	const peersListReducer = async (peers) => {
		const createPeersList = peers.map(async (peer, index) => {
			const fields = { symbol: peer };
			const ticker = await query("prices", fields);
			const profileData = await query("profile", fields);
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
		const poop = await Promise.all(createPeersList);
		setPeersList(poop);
	};

	useEffect(() => {
		const effectFn = async () => {
			const peers = await query("peers", { symbol: props.profileData.ticker });
			await peersListReducer(peers);
		};
		effectFn();
	}, []);

	return (
		<section className={styles["peers"]}>
			<ul>{peersList}</ul>
		</section>
	);
};

export default Peers;
