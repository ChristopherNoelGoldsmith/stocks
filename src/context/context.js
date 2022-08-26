import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";

export const UrlContext = createContext("/");

const URL_TYPES = {
	STOCK: "STOCK",
};

const URLContextProvider = ({ children }) => {
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	const reqApi = useQuery();

	const urlContextReducer = (action) => {
		setUrl(action);
	};

	/*
    ///////////////////////////////////////////////////
    SWITCH STATEMENT PLUGINS
    ///////////////////////////////////////////////////
    */

	const stockTickerUrlChange = async (string) => {
		navigate(`../stock/${string}`, { replace: true });
	};

	/*
    ///////////////////////////////////////////////////
    @type: USED TO DETERMINE THE TYPE OF NAVIATION THAT
    TAKES PLACE VIA THE SWITCH STATEMENT

    @urlString: THE STRING ADDED TO THE URL CHOSEN BY THE @type
    
    useEffect IS USED FOR A RERENDER FOR EACH CHANGE OF THE URL
    ///////////////////////////////////////////////////
    */
	useEffect(() => {
		if (!url) return;
		const { type, urlString } = url;

		switch (type) {
			case "STOCK":
				stockTickerUrlChange(urlString);
				break;

			default:
				console.log("ERROR!");
				break;
		}
	}, [url]);

	return (
		<UrlContext.Provider value={{ urlContextReducer, URL_TYPES }}>
			{children}
		</UrlContext.Provider>
	);
};

export default URLContextProvider;
