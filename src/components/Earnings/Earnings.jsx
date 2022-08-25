///stock/earnings?symbol=AAPL
import { useEffect, useState, Fragment } from "react";
import styles from "./Earnings.module.scss";
import { ScatterChart, XAxis, YAxis, Legend, Scatter } from "recharts";

const createChart = (data) => {
	//take 2 car values and add into 2 div elements wraped in another element;

	const actualRes = data.map((data, index) => {
		return { x: index + 1, y: data.actual };
	});

	const currentRes = data.map((data, index) => {
		return { x: index + 1, y: data.estimate };
	});

	return { actualRes, currentRes };
};

const graphSizeHanlder = () => {
	let width = window.innerWidth / 4;
	let height = width / 2;

	if (width < 200) width = 200;
	if (height < 100) height = 100;
	return {
		width,
		height,
	};
};

const Earnings = (props) => {
	const [chart, setChart] = useState();
	const [highest, setHighest] = useState();
	const [lowest, setLowest] = useState();
	const [graphSize, setGraphSize] = useState();
	const handleWindowResize = () => {
		const graphDim = graphSizeHanlder();
		setGraphSize(graphDim);
		return;
	};

	const setHighAndLowOnChart = () => {
		if (!chart) return;
		const actual = chart.currentRes.map((numbers) => {
			return numbers.y;
		});
		const current = chart.actualRes.map((numbers) => {
			return numbers.y;
		});
		const lowAndHighCur = sortStuff(current);
		const lowAndHighAct = sortStuff(actual);
		const low =
			lowAndHighAct.low < lowAndHighCur.low
				? lowAndHighAct.low
				: lowAndHighCur.low;
		const high =
			lowAndHighAct.high > lowAndHighCur.high
				? lowAndHighAct.high
				: lowAndHighCur.high;
		setHighest(high);
		setLowest(low);
		return;
	};

	const sortStuff = (num) => {
		const lowestToHighest = num.sort((a, b) => a - b);
		return {
			low: lowestToHighest[0],
			high: lowestToHighest[lowestToHighest.length - 1],
		};
	};

	useEffect(() => {
		if (!props.earningsData) return;
		const newChart = createChart(props.earningsData);
		setChart(newChart);
		setHighAndLowOnChart();
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
				<YAxis type={"number"} dataKey="y" domain={[lowest, highest]} />
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
