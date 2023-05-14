import { HiSave } from "react-icons/hi";
const SaveButton = (props) => {
  return (
    <button {...props} className={"with-text"}>
      <HiSave></HiSave>
      Apply
    </button>
  );
};

export default SaveButton;
