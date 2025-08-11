import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from 'react-native';

const AddToCart = async(productId, quantity) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }
        
        // Use platform-specific URL
        const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
        const endpoint = `${baseUrl}/api/carts`;
        const data = {
            cartItem: productId,
            quantity: quantity
        }

        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + JSON.parse(token)
        };

        const response = await axios.post(endpoint, data, {headers});
        console.log('Add to cart response:', response.data);
        return response.data;

    } catch (error) {
        console.log('Add to cart error:', error);
        if (error.response) {
            throw new Error(error.response.data || 'Failed to add to cart');
        } else {
            throw new Error(error.message || 'Network error');
        }
    }
};

export default AddToCart;