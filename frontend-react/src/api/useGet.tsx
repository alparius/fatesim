import axios from "axios";
import { useState } from "react";

const useGet = <T extends {}>(
    url: string
): { response: T | undefined; loading: boolean; showError: boolean; asyncGet: () => Promise<void> } => {
    const [response, setResponse] = useState<T | undefined>();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const URL = process.env.REACT_APP_API_URL + url;

    const asyncGet = async () => {
        setShowError(false);
        setLoading(true);

        await axios.request<T>({ url: URL, withCredentials: true }).then(
            (resp) => {
                setResponse(resp.data);
            },
            () => {
                setShowError(true);
            }
        );

        setLoading(false);
    };

    return { response, loading, showError, asyncGet };
};

export default useGet;
