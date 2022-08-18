import styles from "./LoadingBar.module.scss";

const LoadingBar = (props) => {
	return (
		<div className={styles["loading"]}>
			{" "}
			<span>Loading</span>{" "}
		</div>
	);
};

export default LoadingBar;
