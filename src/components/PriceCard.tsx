import React from 'react';
import { Product } from '../types';

interface PriceCardProps {
    product: Product;
}

const PriceCard: React.FC<PriceCardProps> = ({ product }) => {
    const bestPrice = product.amazonPrice < product.flipkartPrice
        ? 'Amazon'
        : product.flipkartPrice < product.amazonPrice
            ? 'Flipkart'
            : 'Equal';

    return (
        <div style={{
            backgroundColor: '#23272f',
            color: '#fff',
            borderRadius: '12px',
            padding: '24px',
            margin: '0',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: 120, height: 120, borderRadius: '8px', marginBottom: 16 }} />
            <h2 style={{ margin: '8px 0' }}>{product.name}</h2>
            <p style={{ fontSize: 14, color: '#bdbdbd', marginBottom: 12 }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4>Amazon</h4>
                    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4caf50', textDecoration: 'underline' }}>
                        ${product.amazonPrice.toFixed(2)}
                    </a>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h4>Flipkart</h4>
                    <a href={product.flipkartUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3', textDecoration: 'underline' }}>
                        ${product.flipkartPrice.toFixed(2)}
                    </a>
                </div>
            </div>
            <div style={{ marginTop: 16, fontWeight: 'bold', color: bestPrice === 'Amazon' ? '#4caf50' : bestPrice === 'Flipkart' ? '#2196f3' : '#ffb300' }}>
                Best Price: {bestPrice}
            </div>
        </div>
    );
};

export default PriceCard;