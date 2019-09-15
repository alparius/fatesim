import axios from "axios";
import { useState } from "react";
import PlayerData from "../models/PlayerData";
import UserData from "../models/UserData";

const loginURL = process.env.REACT_APP_API_URL + "/auth/login";
const getMeURL = process.env.REACT_APP_API_URL + "/game/mystats";

const useAuth = (
    credentials: UserData,
    setUser: (newUser: PlayerData) => void
): { showError: boolean; postLogin: () => Promise<void> } => {
    const [showError, setShowError] = useState(false);

    const postLogin = async () => {
        await axios
            .post(`${loginURL}?username=${credentials.name}&password=${credentials.password}`, {}, { withCredentials: true })
            .then(
                () => {
                    const getMe = async () => {
                        await axios.get<PlayerData>(getMeURL, { withCredentials: true }).then(
                            (resp2) => {
                                setUser(resp2.data);
                            },
                            () => {
                                setShowError(true);
                            }
                        );
                    };
                    getMe();
                },
                () => {
                    setShowError(true);
                }
            );
    };

    return { showError, postLogin };
};

export default useAuth;
