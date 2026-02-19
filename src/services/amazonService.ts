import { fetchAllProducts } from './apiService';

export const fetchAmazonPrices = async () => {
    return await fetchAllProducts();
};