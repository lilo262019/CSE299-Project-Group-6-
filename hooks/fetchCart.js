import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";
import { Platform } from 'react-native';

const fetchCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async() => {
        setLoader(true);
        const token = await AsyncStorage.getItem('token');
       
        try {
            // Use platform-specific URL
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const endpoint = `${baseUrl}/api/carts/find`;

            const headers = {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + JSON.parse(token)
            };

           const response = await axios.get(endpoint, {headers});
           console.log('Cart response:', response.data);
           
           // Check if cart data exists
           if (response.data && response.data.products && response.data.products.length > 0) {
               const cartProducts = response.data.products;
               setData(cartProducts);
               console.log('Cart products loaded:', cartProducts.length);
           } else {
               console.log('No cart data found');
               setData([]);
           }
           setLoader(false);

        } catch (error) {
            console.log('Cart fetch error:', error);
            setError(error);
            setData([]);
        }finally{
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);

    const refetch = () => {
        setLoader(true);
        fetchData();
    }

    return {data, loading, error, refetch}
};

export default fetchCart;

