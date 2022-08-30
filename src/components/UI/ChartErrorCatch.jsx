import styles from "./ChartErrorCatch.module.scss";

const ChartErrorCatch = (props) => {
	const chartClasses = props.condition
		? `${styles["chart-container"]}`
		: `${styles["chart-container"]} ${styles["error"]}`;

	return (
		<section className={chartClasses}>
			{props.condition ? (
				props.children
			) : (
				<span className={styles["error-text"]}>
					{"THIS DATA COULD NOT BE LOADED"}
				</span>
			)}
		</section>
	);
};

export default ChartErrorCatch;
