import axios from 'axios';
import { CdekResponse } from '../types/cdek';

const API_URL = 'https://api.cdek.ru/v2';
const ACCOUNT = 'wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP';
const SECURE_PASSWORD = 'RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5';

export const getPickupPoints = async (city: string): Promise<CdekResponse> => {
    try {
        const response = await axios.post(`${API_URL}/pickup_points`, {
            city,
            account: ACCOUNT,
            secure_password: SECURE_PASSWORD,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pickup points:', error);
        throw error;
    }
};