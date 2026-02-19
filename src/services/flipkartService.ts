// Static Flipkart product data for price comparison platform
import { amazonProducts } from './amazonService';

export const fetchFlipkartPrices = async () => {
    // Use the same products for comparison, but prices may differ
    return amazonProducts.map(product => ({
        ...product,
        flipkartPrice: +(Math.random() * 1000 + 100).toFixed(2),
    }));
};