import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { Platform } from 'react-native';

const fetchOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async() => {
        setLoader(true);
        const token = await AsyncStorage.getItem('token');
     

        try {
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const endpoint = `${baseUrl}/api/orders`;

            const headers = {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + JSON.parse(token)
            };

           const response = await axios.get(endpoint, {headers});

           console.log('Orders response:', response.data);

            if (response.data && Array.isArray(response.data)) {
                setData(response.data);
                console.log('Orders loaded:', response.data.length);
            } else {
                console.log('No orders data found');
                setData([]);
            }
            setLoader(false);

        } catch (error) {
            console.log('Orders fetch error:', error);
            setError(error);
            setData([]);
        }finally{
            setLoader(false);
        }
    }

    useEffect(() => {
        console.log("Fetching data...");
        fetchData();

    }, []);

    const refetch = () => {
        setLoader(true);
        fetchData();
    }

    console.log('RESP DATA: ', data);
    return {data, loading, error, refetch}
};

export default fetchOrders;

