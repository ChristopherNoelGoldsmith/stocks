import { useState, createContext, useContext } from "react";

export const UrlContext = createContext("/");

//TODO: CHANGE URL FUNCTIONALLITY TO WORK WITH REACT CONTEST HOOK

//TODO: RECONFIGURE CURRENT URL FUNCTIONALLITY

const URLContextProvider = ({ children }) => {
	const [url, setUrl] = useState("/");
	return (
		<UrlContext.Provider value={{ url, setUrl }}>
			{children}
		</UrlContext.Provider>
	);
};

export default URLContextProvider;
