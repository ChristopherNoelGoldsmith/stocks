//STOCK_TICKERS
import STOCK_TICKERS from ".././assets/stocks_tickers.json";

/*
///////////////////////////////////////////////////////
getMount is used to create the basis of the query URL
///////////////////////////////////////////////////////
*/

const getMount = (key) => {
	//KEY TAKES THE APPROPRIATE URL FROM THE MOUNT OBJECT

	//candle require "symbol", "from", "to"
	const apiKey = "cbqdfb2ad3i9b8tfg7q0";

	const mount = {
		candle: `https://finnhub.io/api/v1/stock/candle?&token=${apiKey}&resolution=D`,
		search: `https://finnhub.io/api/vD/search?&token=${apiKey}`,
		prices: `https://finnhub.io/api/v1/quote?&token=${apiKey}`,
		earnings: `https://finnhub.io/api/v1/stock/earnings?&token=${apiKey}`,
		profile: `https://finnhub.io/api/v1/stock/profile2?&token=${apiKey}`,
		peers: `https://finnhub.io/api/v1/stock/peers?&token=${apiKey}`,
	};
	return mount[key];
};

/*
///////////////////////////////////////////////////////
queryReducer TAKES A AN OBJECT AND CONVERTS THE KEY VALUE
PAIRS INTO VALID URL PARAM STRINGS THEN JOINS THEM

EXAMPLE: '&KEY=VALUE'
///////////////////////////////////////////////////////
*/

const queryReducer = (mount, queryObject) => {
	const url = [];
	for (const [key, value] of Object.entries(queryObject)) {
		url.push(`&${key}=${value}`);
	}
	const result = mount + url.join();
	if (result.includes(",")) return result.replace(/,/g, "");
	return result;
};

const useQuery = () => {
	/*
///////////////////////////////////////////////////////
request: THE REQUEST TYPE.  NEEDS TO BE A LOWERCAST STING

queryObject: KEY VALUE PAIRS FOR FIELDS OF THE URL
///////////////////////////////////////////////////////
*/

	const keyValueObjectCreator = async (keys, callback) => {
		//INITIALIZATION 1 ) ON THE FIRST CALL IT CREATES AN EMPTY OBJECT.
		/*
    @newObject = THE NEW OBJECT THE KEY VALUE PAIRS WILL BE ASSIGNED
    @stateKeys = THE KEYS OBTAINED FROM THE CURRENT STATE
    @inc = AN INCRIMENT FOR THE while LOOP
    */
		const newObject = {};

		let inc = 0;
		while (inc < keys.length) {
			const fetchedData = await callback(keys[inc]);
			//ASSIGNMENT 1 ) EACH KEY VALUE PAIR OF THE STATE IS ASSIGNED TO newState
			newObject[keys[inc]] = fetchedData;
			inc++;
		}
		return newObject;
	};

	const createQueryObject = async (request, queryObject) => {
		const queryAPI = async (string) => {
			// URL CONTRUCTION 1 ) CREATES THE BASE FOR THE URL "https://finnhub.io/api/v1/";

			const mount = getMount(string);

			//URL CONTRUSTION 2 ) ADDS THE FIELDS TO THE URL
			const query = queryReducer(mount, queryObject);

			try {
				const result = await fetch(query).then((res) => res.json());

				//ERROR 1 ) BAD REQUESTS RETURN AN EMPTY OBJECT SO CHECKING FOR KEYS IS THE BEST WAY TO VERIFY ERRORS WITH INPUTS
				//RETURNS FALSE UNDER THESE CIRCUMSTANCES.
				if (Object.keys(result).length === 0) return false;

				return result;
			} catch (error) {
				return false;
			}
		};

		if (typeof request === "object") {
			const newObjectThing = await keyValueObjectCreator(request, queryAPI);
			return newObjectThing;
		}

		return await queryAPI(request);
	};
	return createQueryObject;
};
export default useQuery;
