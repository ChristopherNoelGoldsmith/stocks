///stock/earnings?symbol=AAPL
import { useEffect, useState, useReducer } from "react";
import styles from "./Earnings.module.scss";
import { ScatterChart, XAxis, YAxis, Legend, Scatter } from "recharts";
import {
	graphSizeHanlder,
	chartHighAndLow,
	chartRangeReducer,
} from "./chartLogic";

const createEarningsChart = (data) => {
	//take 2 chart values and add into 2 div elements wraped in another element;

	const actualRes = data.map((data, index) => {
		return { x: index + 1, y: data.actual };
	});

	const currentRes = data.map((data, index) => {
		return { x: index + 1, y: data.estimate };
	});

	return { actualRes, currentRes };
};

const Earnings = (props) => {
	const [chart, setChart] = useState();
	const [chartRange, dispatchChartRange] = useReducer(chartRangeReducer, {});
	const [graphSize, setGraphSize] = useState();
	const handleWindowResize = () => {
		const graphDim = graphSizeHanlder();
		setGraphSize(graphDim);
		return;
	};

	useEffect(() => {
		if (!props.earningsData) return;
		const newChart = createEarningsChart(props.earningsData);
		setChart(newChart);
		chartHighAndLow(dispatchChartRange, chart);
		handleWindowResize();
		return;
	}, [props.earningsData, window.innerWidth, window.innerHeight]);

	return (
		<section className={styles["chart"]}>
			<ScatterChart
				width={graphSize?.width || 450}
				height={graphSize?.height || 225}
			>
				<XAxis
					type={"number"}
					tickCount={4}
					domain={[1, 4]}
					dataKey="x"
					unit="Q"
				/>
				<YAxis
					type={"number"}
					dataKey="y"
					domain={[chartRange?.lowest, chartRange?.highest]}
				/>
				<Legend />
				<Scatter
					name="Expected"
					data={chart ? chart.currentRes : null}
					fill="#8884d8"
				/>
				<Scatter
					name="Actual"
					data={chart ? chart.actualRes : null}
					fill="#82ca9d"
				/>
			</ScatterChart>
		</section>
	);
};

export default Earnings;
