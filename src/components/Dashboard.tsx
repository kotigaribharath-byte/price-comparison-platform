import React from 'react';
import PriceCard from './PriceCard';
import { Product } from '../types';

interface DashboardProps {
    products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {

    return (
        <div className="dashboard" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
            padding: '32px',
            background: '#181818',
        }}>
            {products.map(product => (
                <PriceCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Dashboard;