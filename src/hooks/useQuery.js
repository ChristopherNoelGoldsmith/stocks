/*
///////////////////////////////////////////////////////
getMount is used to create the basis of the query URL
///////////////////////////////////////////////////////
*/

const getMount = (key) => {
	//KEY TAKES THE APPROPRIATE URL FROM THE MOUNT OBJECT

	const apiKey = "cbqdfb2ad3i9b8tfg7q0";

	const mount = {
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
	console.log(result);
	return result;
};

const useQuery = () => {
	/*
///////////////////////////////////////////////////////
request: THE REQUEST TYPE.  NEEDS TO BE A LOWERCAST STING

queryObject: KEY VALUE PAIRS FOR FIELDS OF THE URL
///////////////////////////////////////////////////////
*/

	const reqAPI = async (request, queryObject) => {
		try {
			// URL CONTRUCTION 1 ) CREATES THE BASE FOR THE URL "https://finnhub.io/api/v1/";
			const mount = getMount(request);

			//URL CONTRUSTION 2 ) ADDS THE FIELDS TO THE URL
			const query = queryReducer(mount, queryObject);

			const result = await fetch(query).then((res) => res.json());

			//ERROR 1 ) BAD REQUESTS RETURN AN EMPTY OBJECT SO CHECKING FOR KEYS IS THE BEST WAY TO VERIFY ERRORS WITH INPUTS
			//RETURNS FALSE UNDER THESE CIRCUMSTANCES.
			if (Object.keys(result).length === 0) return false;

			return result;
		} catch (error) {
			return false;
		}
	};
	return reqAPI;
};

export default useQuery;
