export const CHART_REDUCER_STRINGS = {
	HIGHEST: "HIGHEST",
	LOWEST: "LOWEST",
};
/*
////////////////////////////////////////////////////
SETS SIZE OF GRAPH DEPENDING ON THE WIDTH OF THE WINDOW

RETURNS WIDTH AND HEIGHT VALUES.

USE IN useEffect HOOK FOR FUNCTIONALITY
////////////////////////////////////////////////////
*/
export const graphSizeHanlder = () => {
	let width = window.innerWidth / 4;
	let height = width / 2;

	if (width < 200) width = 200;
	if (height < 150) height = 150;
	return {
		width,
		height,
	};
};

export const sortLowAndHigh = (num) => {
	const lowestToHighest = num.sort((a, b) => a - b);
	return {
		low: lowestToHighest[0],
		high: lowestToHighest[lowestToHighest.length - 1],
	};
};

/*
////////////////////////////////////////////////////
REDUCER FUNCTION FOR OBTAINING THE HIGHEST AND LOWEST
VALUE OF AN ARRAY OF VALUES.

SETS THE HIGHEST AND LOWEST VALUES IN THE REDUCER PASSED

@reducer: THE REDUCER USED TO SET THE STATE
@chart: THE CHART VALUES BEING SORTED
////////////////////////////////////////////////////
*/
export const chartHighAndLow = (reducer, chart) => {
	if (!reducer) return;
	if (!chart) return;

	const actual = chart.currentRes.map((numbers) => {
		return numbers.y;
	});
	const current = chart.actualRes.map((numbers) => {
		return numbers.y;
	});
	const lowAndHighCur = sortLowAndHigh(current);
	const lowAndHighAct = sortLowAndHigh(actual);
	const low =
		lowAndHighAct.low < lowAndHighCur.low
			? lowAndHighAct.low
			: lowAndHighCur.low;
	const high =
		lowAndHighAct.high > lowAndHighCur.high
			? lowAndHighAct.high
			: lowAndHighCur.high;

	reducer({ type: CHART_REDUCER_STRINGS.HIGHEST, data: high });
	reducer({ type: CHART_REDUCER_STRINGS.LOWEST, data: low });
	return;
};

/*
/////////////////////////////////////////////////////
THE REDUCER USED FOR ALL useReducer FUNCTIONS IN THE
AVBAILABLE CHARTS FOR THINGS SUCH AS THE DELTA, HIGHEST
AND LOWEST VALUES.
/////////////////////////////////////////////////////
*/

export const chartRangeReducer = (state, action) => {
	switch (action.type) {
		case CHART_REDUCER_STRINGS.HIGHEST:
			state.highest = action.data;
			break;
		case CHART_REDUCER_STRINGS.LOWEST:
			state.lowest = action.data;
			break;
		default:
	}

	return {
		highest: state.highest,
		lowest: state.lowest,
	};
};
