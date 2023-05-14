import React from "react";

import { BiSkipNext } from "react-icons/bi";

const NextButton = (props) => {
  return (
    <button {...props}>
      <BiSkipNext style={{ fontSize: "60px" }} />
    </button>
  );
};

export default NextButton;
