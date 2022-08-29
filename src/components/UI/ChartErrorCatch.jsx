import styles from "./ChartErrorCatch.module.scss";

const ChartErrorCatch = (props) => {
	return (
		<section className={styles["chart-error"]}>
			{props.condition ? (
				props.children
			) : (
				<span className={styles["error-text"]}>
					"THIS DATA COULD NOT BE LOADED"
				</span>
			)}
		</section>
	);
};

export default ChartErrorCatch;
