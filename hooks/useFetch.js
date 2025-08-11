import axios from 'axios';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("Fetched data:", data);
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Use platform-specific URL
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const response = await axios.get(`${baseUrl}/api/products/`);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, reFetch };
}

export default useFetch;