import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Variable para indicar si el componente está montado
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                
                // Verificar si el componente está montado antes de actualizar el estado
                if (isMounted) {
                    setData(responseData);
                }
            } catch (error) {
                // Verificar si el componente está montado antes de actualizar el estado
                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                // Verificar si el componente está montado antes de actualizar el estado
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function to cancel fetch on component unmount
        return () => {
            isMounted = false; // Marcar el componente como desmontado
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
