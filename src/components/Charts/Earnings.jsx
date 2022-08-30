///stock/earnings?symbol=AAPL
import { useEffect, useState, useReducer } from "react";
import styles from "./Charts.module.scss";
import { ScatterChart, XAxis, YAxis, Legend, Scatter, Tooltip } from "recharts";
import {
	graphSizeHanlder,
	chartHighAndLow,
	chartRangeReducer,
} from "./chartLogic";
import ChartErrorCatch from "../UI/ChartErrorCatch";

const createEarningsChart = (data) => {
	//take 2 chart values and add into 2 div elements wraped in another element;
	console.log(data);

	const actualRes = data
		.map((data) => {
			return {
				Date: data.period.replace(/-\w+$/gi, "").replace(/-/, "/"),
				Earnings: data.actual,
			};
		})
		.reverse();

	const currentRes = data
		.map((data) => {
			return {
				Date: data.period.replace(/-\w+$/gi, "").replace(/-/, "/"),
				Earnings: data.estimate,
			};
		})
		.reverse();

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
					width={graphSize?.width || 225}
					height={graphSize?.height || 125}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis
						type={"category"}
						dataKey="Date"
						allowDuplicatedCategory={false}
						angle={5}
					/>
					<YAxis
						type={"number"}
						dataKey="Earnings"
						domain={[chartRange?.lowest, chartRange?.highest]}
					/>
					<Tooltip />
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
