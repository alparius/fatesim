import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = <T extends {}>(url: string): { response: T | undefined; loading: boolean; showError: boolean } => {
    const [response, setResponse] = useState<T | undefined>();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const URL = process.env.REACT_APP_API_URL + url;

    useEffect(() => {
        const fetchData = async () => {
            setShowError(false);
            setLoading(true);
            try {
                const result = await axios.request<T>({ url: URL, withCredentials: true });
                // TODO handle status/message
                setResponse(result.data);
            } catch (error) {
                // TODO handle status/message
                setShowError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [URL]);

    return { response, loading, showError };
};

export default useFetch;
