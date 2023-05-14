import { FiLogIn } from "react-icons/fi";
const LoginButton = (props) => {
  return (
    <button {...props} className={"with-text"}>
      <FiLogIn />
      Login
    </button>
  );
};

export default LoginButton;
