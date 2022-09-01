import { useEffect, useState } from "react";
import styles from "./LoadingBar.module.scss";

const LoadingBar = (props) => {
	const [fail, setFail] = useState(false);

	useEffect(() => {
		if (props.fail) setFail(true);
	}, [props.fail]);

	return (
		<div className={styles["loading"]}>
			<span className={`${fail && styles["fail"]}`}>
				{fail ? "NOT FOUND" : "Loading"}
			</span>
		</div>
	);
};

export default LoadingBar;
