import { AiFillPauseCircle } from "react-icons/ai";
const PauseButton = (props) => {
  return (
    <button {...props}>
      <AiFillPauseCircle style={{ fontSize: "90px" }} />
    </button>
  );
};

export default PauseButton;
