import { FaUserPlus } from "react-icons/fa";

const RegisterButton = (props) => {
  return (
    <button {...props} className={"with-text"}>
      <FaUserPlus />
      Register
    </button>
  );
};

export default RegisterButton;
