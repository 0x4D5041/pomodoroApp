import { useContext, useState, useCallback } from "react";
import axios from "axios";

import { UserContext, SettingsContext } from "../context/AppContext";
import { LoginButton } from "../buttons";
import { Modal } from "../layout";
import { AlertBox } from "../AlertBox";

import { AiFillCloseCircle } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

function Login() {
    const { setSettings, setToggleLogin, settings } = useContext(SettingsContext);
    const { setShowUser, setIsActive, setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [toggleAlert, setToggleAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCloseButtonClick = useCallback(() => {
        setToggleLogin(false);
    }, [setToggleLogin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                username: username,
                password: password,
            });

            localStorage.setItem("access_token", res.data.access_token);

            setSettings({
                pomodoroLength: res.data.working_time,
                breakLength: res.data.break_time,
                colorTheme: settings.colorTheme,
            });
            setUser(username);
            setIsActive(true);
            setShowUser(true);
            setToggleLogin(false);
        } catch (error) {
            setAlertMessage(error.response.data.message);
            setToggleAlert(true);
        }
    };

    return (
        <Modal>
            <div className="modal-header">
                <div className="modal-title">
                    <BiUser />
                    <h1>Login to your account</h1>
                </div>
                <AiFillCloseCircle onClick={handleCloseButtonClick} />
            </div>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>

                {toggleAlert && <AlertBox alertMessage={alertMessage} setToggleAlert={setToggleAlert} />}

                <LoginButton />
            </form>
        </Modal>
    );
}

export default Login;
