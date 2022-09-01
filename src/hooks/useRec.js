import useQuery from "./useQuery";
import { useState } from "react";
import TickerInfo from "../components/TickerInfo/TickerInfo";

const useRec = () => {
	const [rec, setRec] = useState();
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
				const queryData = await query(["prices", "profile"], fields);
				//ERROR HANDLING 1 ) RETURNS IF VALUES RETURN AS FALSE FROM THE API
				if (!queryData?.prices.o) return;

				return (
					<li key={Math.random() * 100000}>
						<TickerInfo
							key={Math.random() * 100000}
							ticker={queryData?.prices}
							profileData={queryData?.profile}
							id={peer}
						/>
					</li>
				);
			});

		//LIST CREATION 3 ) RESOLVES ALL PROMISES IN THE ARRAY GENERATED ABOVE;
		const list = await Promise.all(createPeersList);
		return setRec(list);
	};

	return [rec, peersListReducer];
};

export default useRec;
