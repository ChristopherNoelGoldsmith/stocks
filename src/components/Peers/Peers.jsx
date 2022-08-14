import styles from "./Peers.module.scss";
import TickerInfo from "../TickerInfo/TickerInfo";
import { useState, useReducer } from "react";
import useQuery from "../../hooks/useQuery";
import { useEffect } from "react";

const Peers = (props) => {
	return (
		<section className={styles["peers"]}>
			<ul>{props?.peersData}</ul>
		</section>
	);
};

export default Peers;
