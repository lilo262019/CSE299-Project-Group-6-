import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/products/');
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, reFetch };
};

export default useFetch;
