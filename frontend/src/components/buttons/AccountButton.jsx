import { FaUserAlt } from "react-icons/fa";
const AccountButton = (props) => {
  return (
    <button {...props} className={"with-text"}>
      <FaUserAlt />
      {props.username}
    </button>
  );
};

export default AccountButton;
