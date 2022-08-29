import styles from "./Charts.module.scss";
import { useEffect, useReducer, useState } from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip } from "recharts";
import {
	chartRangeReducer,
	graphSizeHanlder,
	sortLowAndHigh,
} from "./chartLogic";
import ChartErrorCatch from "../UI/ChartErrorCatch";

const PriceHistory = (props) => {
	const [graphSize, setGraphSize] = useState();
	const [chart, setChart] = useState();
	const [chartDomain, dispatchChartDomain] = useReducer(chartRangeReducer, {});

	useEffect(() => {
		//ERROR HANDLING 1 ) IF ANY OF THE QUERIES ARE UNSUCESSFUL THE FUNCTION IS RETURNED
		if (!props.data.c) return;

		// CHART 1 ) CREATES CHART DATA WITH PRICE AND DATE
		const chartData = props.data.c.map((price, index) => {
			return {
				name: new Date(props.data.t[index] * 1000).toLocaleDateString("en-US"),
				value: price,
			};
		});
		setChart(chartData);
		//CHART 2 ) SETS CHART SIZE BY FINDING THE DOMAIN AND USING IT TO MEASURE THE BOTTOM AND TOP OF CHART
		dispatchChartDomain(sortLowAndHigh(chartData));
		setGraphSize(graphSizeHanlder());
	}, [window.innerWidth]);

	return (
		<section className={styles["chart"]}>
			<ChartErrorCatch condition={chart}>
				<LineChart
					width={graphSize?.width}
					height={graphSize?.height}
					data={chart}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<Tooltip />
					<XAxis dataKey="name" />
					<YAxis dataKey={"value"} domain={chartDomain} />
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
			</ChartErrorCatch>
		</section>
	);
};
export default PriceHistory;
