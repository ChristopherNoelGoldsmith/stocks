///stock/earnings?symbol=AAPL
import { useEffect, useState, useReducer } from "react";
import styles from "./Charts.module.scss";
import { ScatterChart, XAxis, YAxis, Legend, Scatter } from "recharts";
import {
	graphSizeHanlder,
	chartHighAndLow,
	chartRangeReducer,
} from "./chartLogic";
import ChartErrorCatch from "../UI/ChartErrorCatch";

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
		//ERROR HANDLING 1 ) CANCELS FUNCTION IF earningsData IS NOT VALID
		if (!props.earningsData) return;

		//CHART 1 ) CREATES CHART THEN SETS IT TO THE STATE
		const newChart = createEarningsChart(props.earningsData);
		setChart(newChart);

		// CHART 2 ) SIZES CHART DEPENDING ON THE DOMAIN OF THE DATA FROM earningsData
		chartHighAndLow(dispatchChartRange, chart);
		handleWindowResize();
		return;
	}, [props.earningsData, window.innerWidth, window.innerHeight]);

	return (
		<section className={styles["chart"]}>
			<ChartErrorCatch condition={chart}>
				<ScatterChart
					width={graphSize?.width || 450}
					height={graphSize?.height || 225}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
			</ChartErrorCatch>
		</section>
	);
};

export default Earnings;
