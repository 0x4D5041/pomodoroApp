import React from "react";
import { NextButton, PauseButton, PlayButton } from "../buttons";

const PlayPauseNextButtons = ({ isPaused, isPausedRef, setIsPaused, playBoop, switchMode }) => {
    const onButtonClick = (value) => {
        setIsPaused(value);
        isPausedRef.current = value;
    };

    return (
        <div className="container-buttons">
            {isPaused ? (
                <PlayButton onClick={() => onButtonClick(false)} onMouseDown={playBoop} />
            ) : (
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <PauseButton onClick={() => onButtonClick(true)} onMouseDown={playBoop} />
                    <NextButton onClick={switchMode} />
                </div>
            )}
        </div>
    );
};

export default PlayPauseNextButtons;
