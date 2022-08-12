import styles from "./TickerInfo.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TickerInfo = (props) => {
	const navigate = useNavigate();
	const [priceMove, setPriceMove] = useState();
	const [priceDisplay, setPriceDisplay] = useState();

	const navigationHandler = (event) => {
		navigate(`../stock/${event.target.textContent}`, { replace: true });
	};

	const priceMovementHanlder = () => {
		const pMove = Math.round((props.ticker.c / props.ticker.o) * 100 - 100);
		return setPriceMove(`${pMove}%`);
	};

	const priceMoveDisplay = () => {
		props.ticker.c > props.ticker.o
			? setPriceDisplay({ color: "red" })
			: setPriceDisplay({ color: "green" });
		console.log(props.ticker.c);
		return;
	};

	useEffect(() => {
		priceMovementHanlder();
		priceMoveDisplay();
		console.log(priceDisplay);
	}, []);

	return (
		<figure className={styles["ticker-info"]}>
			<img
				id={props.profileData.name}
				src={props.profileData.logo}
				alt="company logo"
			/>
			<label
				bottom={props.profileData.name}
				htmlFor={props.profileData.name}
				className={styles["ticker"]}
				onClick={navigationHandler}
			>
				{props.id}
			</label>
			<section>
				<div className={`${styles["price"]}`}>
					<span
						bottom={priceMove}
						className={` ${styles[`${"red"}`]}`}
					>{`$${props.ticker.c}`}</span>
				</div>
			</section>
		</figure>
	);
};

export default TickerInfo;
