import { IoSettings } from "react-icons/io5";
const SettingsButton = (props) => {
    return (
        <button {...props} className={"with-text"} style={{ margin: "auto" }}>
            <IoSettings />
            Settings
        </button>
    );
};

export default SettingsButton;
