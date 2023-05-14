import { useCallback, useContext, useState } from "react";
import axios from "axios";

import { SettingsContext, UserContext } from "../context/AppContext";
import { SaveButton } from "../buttons";
import { Modal } from "../layout";
import ColorInput from "./ColorInput";

import { AiFillCloseCircle, AiOutlineFieldTime, AiOutlineBgColors } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

import click from "../../sounds/click.mp3";
import useSound from "use-sound";

const Settings = ({ colors }) => {
    const [playClick] = useSound(click, { volume: 1 });

    const { breakLength, pomodoroLength, color, setToggleSettings, handleApplyChanges } = useContext(SettingsContext);
    const { isActive } = useContext(UserContext);

    const [minutesPomodoro, setMinutesPomodoro] = useState(pomodoroLength);
    const [minutesBreak, setMinutesBreak] = useState(breakLength);
    const [colorChosed, setColorChosed] = useState(color);

    const handleSettingsClick = useCallback(() => {
        setToggleSettings(false);
    }, [setToggleSettings]);

    const onColorChange = (e) => {
        setColorChosed(e.target.value);
    };

    const applySettings = (e) => {
        e.preventDefault();
        handleApplyChanges(minutesPomodoro, minutesBreak, colorChosed);
        if (isActive) {
            const token = localStorage.getItem("access_token");
            axios.put(
                `${import.meta.env.VITE_API_URL}/settings`,
                {
                    work_minutes: minutesPomodoro,
                    break_minutes: minutesBreak,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }

        setToggleSettings(false);
    };

    return (
        <Modal>
            <div className="modal-header">
                <div className="modal-title">
                    <FiSettings />
                    <h1>Pomodoro Settings</h1>
                </div>
                <AiFillCloseCircle onClick={handleSettingsClick} />
            </div>
            <div className="settings-body">
                <div className="options-title">
                    <AiOutlineFieldTime />
                    <h3>Time (minutes)</h3>
                </div>
                <form onSubmit={applySettings}>
                    <div className="settings">
                        <div className="time-panel">
                            <div>
                                <label htmlFor="pomodoroLenght">Pomodoro Time</label>
                                <input
                                    type="number"
                                    name="pomodoroLenght"
                                    min={1}
                                    max={45}
                                    defaultValue={minutesPomodoro}
                                    onChange={(e) => setMinutesPomodoro(parseInt(e.target.value))}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="breakLenght">Break Time</label>
                                <input
                                    type="number"
                                    name="breakLenght"
                                    min={1}
                                    max={15}
                                    defaultValue={minutesBreak}
                                    onChange={(e) => setMinutesBreak(parseInt(e.target.value))}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <div className="options-title">
                            <AiOutlineBgColors />
                            <h3>Timer Color Theme</h3>
                        </div>
                        <div className="color-options">
                            {Object.entries(colors).map(([key, color]) => {
                                return (
                                    <ColorInput
                                        key={key}
                                        color={color}
                                        colorChosed={colorChosed}
                                        onColorChange={onColorChange}
                                        playClick={playClick}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <SaveButton />
                </form>
            </div>
        </Modal>
    );
};

export default Settings;
