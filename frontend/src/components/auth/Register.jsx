import { useContext, useState, useCallback } from "react";
import { SettingsContext } from "../context/AppContext";
import RegisterButton from "../buttons/RegisterButton";

import { Modal } from "../layout";
import { AiFillCloseCircle, AiOutlineUserAdd } from "react-icons/ai";
import { AlertBox } from "../AlertBox";

import axios from "axios";

function Register() {
    const { setToggleRegister } = useContext(SettingsContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [toggleAlert, setToggleAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const onCloseButtonClick = useCallback(() => {
        setToggleRegister(false);
    }, [setToggleRegister]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
                username: username,
                password: password,
            });
            if (res.status >= 200 && res.status < 300) {
                setAlertMessage(res.data.message);
                setToggleAlert(true);
                setToggleRegister(false);
            } else {
                throw new Error("Server returned an error status code");
            }
        } catch (err) {
            setAlertMessage(err.response.data.message);
            setToggleAlert(true);
        }
    };

    return (
        <Modal>
            <div className="modal-header">
                <div className="modal-title">
                    <AiOutlineUserAdd />
                    <h1>Create your Account</h1>
                </div>
                <AiFillCloseCircle onClick={onCloseButtonClick} />
            </div>
            <form onSubmit={handleRegister}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>

                {toggleAlert && <AlertBox alertMessage={alertMessage} setToggleAlert={setToggleAlert} />}

                <RegisterButton />
            </form>
        </Modal>
    );
}

export default Register;
