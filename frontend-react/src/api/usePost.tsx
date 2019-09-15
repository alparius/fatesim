import axios from "axios";
import { useState } from "react";

const usePost = <T extends {}>(url: string, data: T): { showError: boolean; asyncPost: () => Promise<void> } => {
    const [showError, setShowError] = useState(false);

    const URL = process.env.REACT_APP_API_URL + url;

    const asyncPost = async () => {
        await axios.post<T>(URL, data, { withCredentials: true }).catch(() => {
            setShowError(true);
        });
    };

    return { showError, asyncPost };
};

export default usePost;
