import React, { useReducer } from "react";

function SmallButton({ name, active, check_submit, activeCheck }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      value: false,
    }
  );

  console.log("state.value :>> ", state.value);
  let handleCheck = () => {
    setState({ value: !state.value });
    check_submit(name, state.value);
  };
  return (
    <div
      className={activeCheck ? "smallBtn active mx-2" : "smallBtn mx-2"}
      onClick={handleCheck}
    >
      <button>{name}</button>
    </div>
  );
}

export default SmallButton;
