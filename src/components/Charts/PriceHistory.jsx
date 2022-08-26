import { useEffect, useReducer, useState } from "react";
import { LineChart, XAxis, YAxis, Line, Tooltip } from "recharts";
import {
	chartRangeReducer,
	graphSizeHanlder,
	sortLowAndHigh,
} from "./chartLogic";

const PriceHistory = (props) => {
	const [graphSize, setGraphSize] = useState();
	const [chart, setChart] = useState();
	const [chartDomain, dispatchChartDomain] = useReducer(chartRangeReducer, {});

	useEffect(() => {
		console.log(props.data);
		if (!props.data) return;
		const chartData = props.data.c.map((price, index) => {
			return {
				name: new Date(props.data.t[index] * 1000).toLocaleDateString("en-US"),
				value: price,
			};
		});
		setChart(chartData);
		console.log(chart);
		dispatchChartDomain(sortLowAndHigh(chartData));
		console.log(chartDomain);
		setGraphSize(graphSizeHanlder());
	}, [window.innerWidth]);

	return (
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
	);
};

export default PriceHistory;
