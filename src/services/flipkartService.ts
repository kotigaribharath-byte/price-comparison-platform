import { fetchAllProducts } from './apiService';

export const fetchFlipkartPrices = async () => {
    return await fetchAllProducts();
};