import { render } from "@testing-library/react";
import LoadingBar from "./LoadingBar";

test("<LoadingBar/> render", () => {
	//RENDER 1 ) NORMAL RENDER
	render(<LoadingBar />);

	//RENDER 2 RENDER WITH PROPS
	render(<LoadingBar fail={true} />);
});
