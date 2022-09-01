import STOCK_TICKERS from "../assets/stocks_tickers.json";

export const checkCompanyName = (company, trys = 0) => {
	//TODO: MAKE SEARCH CORRECTION BETTER
	if (typeof company !== "string") return false;
	if (trys > 5) return false;

	// FILTER 1 ) FILTERS THROUGH THE LIST OF STOCKS FOR THE COMPANY NAME
	const filterData = (string) => {
		const regExp = new RegExp(string, "i");

		const filteredData = STOCK_TICKERS.filter((stock) => {
			//FILTER 2 ) REMOVES ANY TICKERS WITH THE $ SINCE THEY ARE NOT COMMON STOCK
			return (
				regExp.test(stock["Company Name"]) && !/\$/.test(stock["ACT Symbol"])
			);
		});
		return filteredData;
	};

	const checkForCompany = filterData(company);

	// FILTER 3 ) IF NO COMPANIES COME BACK FROM THE FILTER, THE STRING IS SHORTENED AND THE FUNCTION IS RECCURED
	// IF THE FUNCTION IS RECCURED 5 TIMES IT RETURNS FALSE
	if (!checkForCompany || checkForCompany.length === 0) {
		const shorterName = company.slice(0, company.length - 1);
		const attempt = trys + 1;
		return checkCompanyName(shorterName, attempt);
	}

	const [ticker] = checkForCompany;
	return ticker["ACT Symbol"];
};
