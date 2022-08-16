import styles from "./TickerInfo.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TickerInfo = (props) => {
	const navigate = useNavigate();
	const [priceMove, setPriceMove] = useState();
	const [priceDisplay, setPriceDisplay] = useState();

	//TAKES EXTRA DIGITS OFF OF PRICE OR ADDS A 0
	const slicePrice = (price) => {
		// CONVERSION 1 ) CONVERTS PRICE INTO A STRING
		const priceString = `${price}`;

		// CHECK 1 ) CHECKS PRICE FORMAT. IF IT IS "digit+.digit digit"
		const regExpForLong = /\d+\.\d\d/;

		// RETURN 1 ) IF THE PRICE MATCHES THE REGEXP IT RETURNS IIT ITHOUT ANY EXTRA DIGITS
		// 161.116 WOULD RETURN "161.11"
		const forLong = priceString.match(regExpForLong);
		if (forLong) return priceString.match(regExpForLong);

		// CHECK 2 ) IF PRICE DOES NOT CONTAIN A DECIMAL AND IS A ROUND NUMBER IT RETURNS IT WITH .00
		// 150 WOULD RETURN '150.00".
		if (!priceString.match(/\./)) return priceString + ".00";

		// CHECK 3 ) ANY STRING THAT DO NOT MATCH THE PREVIOUS CRITERIA WOULD BE HAVE A ROUND DECIMAL "161."
		// SO IT ADDS A 0 "161.10".
		return priceString + "0";
	};

	//CHANGES PAGE TO TICKER SYMBOL INSERTED WHEN ACTIVATED
	const navigationHandler = (event) => {
		navigate(`../stock/${event.target.textContent}`, { replace: true });
	};

	// DETERMINES THE NUMBERS OF THE PRICE MOVEMENT BOX BELOW A COMPANIES PRICE
	const priceMovementHanlder = () => {
		console.log(props.ticker);

		// PRICE 1 ) CREATES THE PERCENTAGE CHANGE AND DIFFERENCE IN PRICE
		const pMove = Math.round(((props.ticker?.c / props.ticker?.o) * 100) / 100);
		const dMove = Math.round((props.ticker?.c - props.ticker?.o) * 100) / 100;

		// PRICE 2 ) SETS WITH A TEMPLATE STRING
		return setPriceMove(`$${dMove} | ${pMove}%`);
	};

	//DETERMINES THE COLOR OF THE PRICE MOVEMENT BOX
	const priceMoveDisplay = () => {
		//IF CURRENT PRICE IS LOWER THAN OPEN BOX IS RED, IF HIGHER BOX IS GREEN
		props.ticker?.c > props.ticker?.o
			? setPriceDisplay("red")
			: setPriceDisplay("green");
		return;
	};

	useEffect(() => {
		priceMovementHanlder();
		priceMoveDisplay();
	}, [props.ticker]);
	return (
		<figure className={styles["ticker-info"]}>
			<img
				id={props.profileData?.name}
				src={props.profileData?.logo}
				alt="company logo"
			/>
			<label
				bottom={props.profileData?.name}
				htmlFor={props.profileData?.name}
				className={styles["ticker"]}
				onClick={navigationHandler}
			>
				{props.id}
			</label>
			<section>
				<div className={`${styles["price"]}`}>
					<span
						bottom={priceMove}
						className={` ${styles[`${priceDisplay}`]}`}
					>{`$${slicePrice(props.ticker?.c)}`}</span>
				</div>
			</section>
		</figure>
	);
};

export default TickerInfo;
