import { useState, useCallback } from "react";

export const useHttp = ()  => {

    const [error, setError] = useState<null | string>(null),
          [loading, setLoading] = useState<boolean>(false);

    const getRequest = useCallback(async <T>(url: string): Promise<T> => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Could not fetch with ${url}. Status: ${response.status} `);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e: any ) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, getRequest, clearError};
}
