import { render } from "react-dom";

const ErrorBoundry = (props) => {
	const checkError = () => {
		try {
			return props.children;
		} catch (error) {
			console.log(error);
			return <div>{`SOMETHING WENT WRONG! ERROR: ${error}`}</div>;
		}
	};

	return <div>{checkError()}</div>;
};

export default ErrorBoundry;
