import axios from "axios";
import { useEffect, useState } from "react";
import PlayerData from "../models/PlayerData";

const useSession = (): { user: PlayerData | undefined; setUser: (newUser: PlayerData) => void; handleLogout: () => void } => {
    const storedUser = sessionStorage.getItem("user");

    let initUser: PlayerData | undefined;
    if (storedUser) {
        initUser = JSON.parse(storedUser);
    } else {
        initUser = undefined;
    }

    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    const handleLogout = () => {
        axios.post(process.env.REACT_APP_API_URL + "/auth/logout", {}, { withCredentials: true });
        setUser(undefined);
    };

    return { user, setUser, handleLogout };
};

export default useSession;
