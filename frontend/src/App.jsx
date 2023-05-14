import "./App.css";

import { useEffect, useState } from "react";

import { Login, Register } from "./components/auth";
import { SettingsContext, UserContext } from "./components/context/AppContext";
import Settings from "./components/Settings/Settings";
import Timer from "./components/TimerDisplay/Timer";
import Banner from "./components/banner/Banner";

import { SettingsButton } from "./components/buttons";

import axios from "axios";

import { colors, defaultSettings } from "../constants";

function App() {
    const [toggleSettings, setToggleSettings] = useState(false);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);

    const [settings, setSettings] = useState(() => {
        const storedColorTheme = localStorage.getItem("colorTheme");
        return {
            pomodoroLength: defaultSettings.pomodoroDefault,
            breakLength: defaultSettings.breakDefault,
            colorTheme: storedColorTheme ? storedColorTheme : colors.default,
        };
    });

    const [showUser, setShowUser] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [username, setUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSettings({
                    pomodoroLength: response.data.working_time,
                    breakLength: response.data.break_time,
                    colorTheme: settings.colorTheme,
                });

                setUser(response.data.user);
                setShowUser(true);
                setIsActive(true);
            }
        };
        fetchData();
    }, []);

    function handleApplyChanges(newPomodoroLength, newBreakLength, newColor) {
        localStorage.setItem("colorTheme", newColor);
        setSettings({
            pomodoroLength: newPomodoroLength,
            breakLength: newBreakLength,
            colorTheme: newColor,
        });
    }

    return (
        <div className="App">
            <main>
                <SettingsContext.Provider
                    value={{
                        pomodoroLength: settings.pomodoroLength,
                        breakLength: settings.breakLength,
                        color: settings.colorTheme,
                        toggleLogin,
                        setSettings,
                        setToggleSettings,
                        setToggleLogin,
                        setToggleRegister,
                        handleApplyChanges,
                        settings,
                    }}
                >
                    <UserContext.Provider
                        value={{
                            showUser,
                            setShowUser,
                            isActive,
                            setIsActive,
                            username,
                            setUser,
                        }}
                    >
                        <Banner />
                        {toggleSettings && <Settings colors={colors} />}
                        {toggleRegister && <Register />}
                        {toggleLogin && <Login />}
                        <Timer />

                        <SettingsButton onClick={() => setToggleSettings(true)} />
                    </UserContext.Provider>
                </SettingsContext.Provider>
            </main>
        </div>
    );
}

export default App;
