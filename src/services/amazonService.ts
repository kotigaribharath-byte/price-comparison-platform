// Static Amazon product data for price comparison platform
import { Product } from '../types';

export const amazonProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
    id: `prod-amazon-${i+1}`,
    name: `Electronic Product ${i+1}`,
    imageUrl: `https://via.placeholder.com/150?text=Product+${i+1}`,
    description: `Specs for Electronic Product ${i+1}: 8GB RAM, 256GB SSD, Intel i5, 15.6" Display, Battery 6hrs, Weight 1.5kg.`,
    amazonPrice: +(Math.random() * 1000 + 100).toFixed(2),
    flipkartPrice: +(Math.random() * 1000 + 100).toFixed(2),
    amazonUrl: `https://www.amazon.in/product${i+1}`,
    flipkartUrl: `https://www.flipkart.com/product${i+1}`
}));

export const fetchAmazonPrices = async () => {
    return amazonProducts;
};