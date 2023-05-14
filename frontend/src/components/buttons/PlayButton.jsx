import { AiFillPlayCircle } from "react-icons/ai";
const PlayButton = (props) => {
  return (
    <button {...props}>
      <AiFillPlayCircle style={{ fontSize: "90px" }} />
    </button>
  );
};

export default PlayButton;
