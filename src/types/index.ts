export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    amazonPrice: number;
    flipkartPrice: number;
    amazonUrl: string;
    flipkartUrl: string;
    specs: string[];
}