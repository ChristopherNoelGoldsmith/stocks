import styles from "./TickerInfo.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TickerInfo = (props) => {
	const navigate = useNavigate();
	const [priceMove, setPriceMove] = useState();
	const [priceDisplay, setPriceDisplay] = useState();

	//CHANGES PAGE TO TICKER SYMBOL INSERTED WHEN ACTIVATED
	const navigationHandler = (event) => {
		navigate(`../stock/${event.target.textContent}`, { replace: true });
	};

	// DETERMINES THE NUMBERS OF THE PRICE MOVEMENT BOX BELOW A COMPANIES PRICE
	const priceMovementHanlder = () => {
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
	}, []);

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
					>{`$${props.ticker?.c}`}</span>
				</div>
			</section>
		</figure>
	);
};

export default TickerInfo;
