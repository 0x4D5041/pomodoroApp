import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const AlertBox = ({ alertMessage, setToggleAlert }) => {
    const alertStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "rgb(162, 202, 206)",
        color: "rgb(38, 24, 26)",
        borderRadius: "4px",
        margin: "20px 0",
    };

    const buttonStyle = {
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "rgb(38, 24, 26)",
        fontSize: "1.2rem",
    };

    return (
        <div style={alertStyle}>
            <p style={{ margin: "0" }}>{alertMessage}</p>
            <button style={buttonStyle} onClick={() => setToggleAlert(false)}>
                <AiFillCloseCircle style={{ fontSize: "30px" }} />
            </button>
        </div>
    );
};

export default AlertBox;
