import { supabase } from '../lib/supabaseClient';
import { Product } from '../types';

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;

        // Map database snake_case to frontend camelCase
        return (data || []).map(row => ({
            id: row.id,
            name: row.name,
            imageUrl: row.image_url,
            description: row.description,
            amazonPrice: row.amazon_price,
            flipkartPrice: row.flipkart_price,
            amazonUrl: row.amazon_url,
            flipkartUrl: row.flipkart_url,
            specs: row.specs
        }));
    } catch (error) {
        console.error('Error fetching products from Supabase:', error);
        throw error;
    }
};
