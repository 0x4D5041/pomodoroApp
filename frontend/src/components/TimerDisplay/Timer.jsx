import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useContext, useState, useEffect, useRef } from "react";
import { SettingsContext } from "../context/AppContext";

import ShadowBehindTimer from "./ShadowBehingTimer";
import PlayPauseNextButtons from "./PlayPauseNextButtons";
import Mode from "./Mode";

import ringer from "../../sounds/bellSound.mp3";
import boop from "../../sounds/very_short_notif.mp3";

import useSound from "use-sound";

function Timer() {
    const trailColor = "rgba(70,80,150,0.70)";
    const { pomodoroLength, breakLength, color } = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState("pomodoro");

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const [playBoop] = useSound(boop, { volume: 0.55 });
    const [playEndPomodoro] = useSound(ringer, { volume: 0.25 });

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function switchMode() {
        const nextMode = modeRef.current === "pomodoro" ? "break" : "pomodoro";
        const nextSeconds = (nextMode === "pomodoro" ? pomodoroLength : breakLength) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;

        playEndPomodoro();
    }

    useEffect(() => {
        secondsLeftRef.current = pomodoroLength * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [pomodoroLength, breakLength]);

    const totalSeconds = mode === "pomodoro" ? pomodoroLength * 60 : breakLength * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = "0" + seconds;

    return (
        <div className="timer-container">
            <ShadowBehindTimer percentage={percentage} color={color}>
                <CircularProgressbar
                    value={percentage}
                    text={minutes + ":" + seconds}
                    styles={buildStyles({
                        textColor: "#fff",
                        pathColor: color,
                        trailColor: trailColor,
                    })}
                />
            </ShadowBehindTimer>
            <div className="container-buttons-play-pause">
                <PlayPauseNextButtons
                    isPaused={isPaused}
                    isPausedRef={isPausedRef}
                    setIsPaused={setIsPaused}
                    playBoop={playBoop}
                    switchMode={switchMode}
                />
            </div>
            <Mode mode={mode} />
        </div>
    );
}

export default Timer;
