import { useReducer } from "react";

/*
///////////////////////////////
CONTROLS THE STATE OF THE INPUT

THIS REDUCER TAKES AN OBJECT 

{type: "this takes a string that will be the key to a key value pair", 
data: "the data for the key value pair"}
///////////////////////////////
*/
const inputReducer = (state, action) => {
	//INITIALIZATION 1 ) ON THE FIRST CALL IT CREATES AN EMPTY OBJECT.
	if (!state) state = {};

	/*
    @newState = THE NEW OBJECT THE KEY VALUE PAIRS WILL BE ASSIGNED
    @stateKeys = THE KEYS OBTAINED FROM THE CURRENT STATE
    @inc = AN INCRIMENT FOR THE while LOOP
    */
	const newState = {};
	const stateKeys = Object.keys(state);

	let inc = 0;
	while (inc < stateKeys.length) {
		//ASSIGNMENT 1 ) EACH KEY VALUE PAIR OF THE STATE IS ASSIGNED TO newState

		newState[stateKeys[inc]] = state[stateKeys[inc]];
		inc++;
	}

	//ASSIGNMENT 2 ) TAKES THE type PROPRTY OF THE OBJECT PASSED AND ASSIGNS IT TO THE STATE WITH THE data PROPERY AS A KEYVALUE PAIR.
	newState[action.type] = action.data;
	return newState;
};

const useInput = () => {
	const [inputState, dispatchInput] = useReducer(inputReducer);

	/*--------------------------------------------------------------------
    WHEN CREATING A FORM OR SERIES OF INPUTS YOU CAN PICK HANDLERS FROM THIS COMPONENT
    AND UTILIZE THE STATE RETURNED VIA "inputState" TO HANDLE ACTIONS IN THE DOM

    TO ADD MORE HANDLERS ADD A HANDLER BELOW AND PLUG IN THE VALUES INTO THE REDUCER ABOVE.
    FOLLOW THE STANDARDS OF THE OTHER HANDLERS!
    */ //------------------------------------------------------------------

	const inputHandler = (payload) => {
		dispatchInput(payload);
		return;
	};

	return {
		inputState,
		inputHandler,
	};
};

export default useInput;
