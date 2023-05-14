import React from "react";

const ShadowBehindTimer = ({ children, percentage, color }) => {
    return (
        <div
            className="aura-behind-timer"
            style={{
                boxShadow: `0px 0px ${percentage}px ${percentage / 10}px ${color}`,
            }}
        >
            {children}
        </div>
    );
};

export default ShadowBehindTimer;
