import { useContext, useCallback } from "react";
import { RegisterButton, LoginButton, AccountButton } from "../buttons";
import { SettingsContext, UserContext } from "../context/AppContext";

const Banner = () => {
    const { setToggleLogin, setToggleRegister } = useContext(SettingsContext);
    const { setShowUser, showUser, username } = useContext(UserContext);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("access_token");
        setShowUser(false);
    }, [setShowUser]);

    const handleRegisterClick = useCallback(() => {
        setToggleRegister(true);
    }, [setToggleRegister]);

    const handleLoginClick = useCallback(() => {
        setToggleLogin(true);
    }, [setToggleLogin]);

    return (
        <div className="banner">
            <h1>Pomodoro Timer</h1>
            <div>
                {showUser ? (
                    <AccountButton username={username} onClick={handleLogout} />
                ) : (
                    <div className="buttons-container-banner">
                        <RegisterButton onClick={handleRegisterClick} />
                        <LoginButton onClick={handleLoginClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;
