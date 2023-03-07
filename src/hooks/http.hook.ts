
export const useHttp = ()  => {

    const controllers = (new Map<string, AbortController>());

    const abortRequestSafe = (key: string): void => {
        controllers.get(key)?.abort?.();
        console.log(`Cancelled ${key}`);
    }

    const getRequest = async <T>(url: string, signalKey: string = "" ): Promise<T> => {
           
        try {
            const response = await fetch(url, { signal: controllers.get(signalKey)?.signal });
            if (!response.ok) {
                throw new Error(`Could not fetch with ${url}. Status: ${response.status} `);
            }
            
            const data = await response.json();
            return data;
        } catch (e: any ) {
            throw e;
        }
        
    }
    
    
    return {getRequest, abortRequestSafe};
}
        