import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAmazonPrices } from '../services/amazonService';
import { fetchFlipkartPrices } from '../services/flipkartService';
import { Product } from '../types';

const Comparison: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const amazonData = await fetchAmazonPrices();
                const flipkartData = await fetchFlipkartPrices();
                const combinedData = [...amazonData, ...flipkartData];
                setProducts(combinedData);
            } catch (err) {
                setError('Failed to fetch product prices');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleProductSelection = (productId: string) => {
        const newSelected = new Set(selectedProducts);
        if (newSelected.has(productId)) {
            newSelected.delete(productId);
        } else {
            newSelected.add(productId);
        }
        setSelectedProducts(newSelected);
    };

    const selectedProductList = products.filter(p => selectedProducts.has(p.id));

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#181818',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: '1.2rem',
            }}>
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#181818',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ff6b6b',
                fontSize: '1.2rem',
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f0f0f',
            color: '#fff',
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #181818 0%, #23272f 100%)',
                padding: '30px 20px',
                borderBottom: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <div>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '1.8rem' }}>Price Comparison</h1>
                    <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
                        Select products to compare prices across Amazon and Flipkart
                    </p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '10px 20px',
                        background: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                    }}
                >
                    ← Back Home
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: selectedProductList.length > 0 ? '1fr 1fr' : '1fr',
                gap: '30px',
                padding: '30px 20px',
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {/* Product Selection Section */}
                <div>
                    <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.3rem' }}>
                        Available Products ({products.length})
                    </h2>
                    <div style={{
                        display: 'grid',
                        gap: '16px',
                        maxHeight: selectedProductList.length > 0 ? 'calc(100vh - 200px)' : 'none',
                        overflowY: 'auto',
                        paddingRight: '10px',
                    }}>
                        {products.map(product => (
                            <div
                                key={product.id}
                                onClick={() => toggleProductSelection(product.id)}
                                style={{
                                    background: selectedProducts.has(product.id) 
                                        ? 'rgba(76, 175, 80, 0.15)' 
                                        : '#23272f',
                                    border: selectedProducts.has(product.id)
                                        ? '2px solid #4caf50'
                                        : '1px solid #333',
                                    borderRadius: '10px',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr 18px',
                                    gap: '12px',
                                    alignItems: 'center',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 
                                        selectedProducts.has(product.id) 
                                            ? 'rgba(76, 175, 80, 0.25)' 
                                            : '#2a2f38';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 
                                        selectedProducts.has(product.id) 
                                            ? 'rgba(76, 175, 80, 0.15)' 
                                            : '#23272f';
                                }}
                            >
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                    }}
                                />
                                <div style={{ minWidth: 0 }}>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.name}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#999', 
                                        fontSize: '0.8rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {product.description}
                                    </p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.has(product.id)}
                                    onChange={() => {}}
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        cursor: 'pointer',
                                        accentColor: '#4caf50',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Section */}
                {selectedProductList.length > 0 && (
                    <div>
                        <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.3rem' }}>
                            Comparison ({selectedProductList.length} selected)
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            maxHeight: 'calc(100vh - 200px)',
                            overflowY: 'auto',
                            paddingRight: '10px',
                        }}>
                            {selectedProductList.map(product => {
                                const amazonPrice = product.amazonPrice;
                                const flipkartPrice = product.flipkartPrice;
                                const bestPrice = amazonPrice < flipkartPrice ? 'amazon' : 'flipkart';
                                const savings = bestPrice === 'amazon' 
                                    ? flipkartPrice - amazonPrice 
                                    : amazonPrice - flipkartPrice;

                                return (
                                    <div
                                        key={product.id}
                                        style={{
                                            background: '#23272f',
                                            borderRadius: '10px',
                                            padding: '20px',
                                            border: '1px solid #333',
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name} 
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: '0 0 4px 0' }}>{product.name}</h3>
                                                <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px',
                                            marginBottom: '12px',
                                        }}>
                                            <a
                                                href={product.amazonUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    background: bestPrice === 'amazon' 
                                                        ? 'rgba(76, 175, 80, 0.2)' 
                                                        : '#2a2f38',
                                                    border: bestPrice === 'amazon'
                                                        ? '1px solid #4caf50'
                                                        : '1px solid #333',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    textDecoration: 'none',
                                                    textAlign: 'center',
                                                    color: bestPrice === 'amazon' ? '#4caf50' : '#bdbdbd',
                                                    fontSize: '0.95rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = 
                                                        bestPrice === 'amazon' 
                                                            ? 'rgba(76, 175, 80, 0.3)' 
                                                            : '#333';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = 
                                                        bestPrice === 'amazon' 
                                                            ? 'rgba(76, 175, 80, 0.2)' 
                                                            : '#2a2f38';
                                                }}
                                            >
                                                <div style={{ fontWeight: 'bold' }}>
                                                    ${amazonPrice.toFixed(2)}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'inherit', opacity: 0.8 }}>
                                                    Amazon {bestPrice === 'amazon' ? '✓ Best Price' : ''}
                                                </div>
                                            </a>

                                            <a
                                                href={product.flipkartUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    background: bestPrice === 'flipkart' 
                                                        ? 'rgba(3, 218, 198, 0.2)' 
                                                        : '#2a2f38',
                                                    border: bestPrice === 'flipkart'
                                                        ? '1px solid #03dac6'
                                                        : '1px solid #333',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    textDecoration: 'none',
                                                    textAlign: 'center',
                                                    color: bestPrice === 'flipkart' ? '#03dac6' : '#bdbdbd',
                                                    fontSize: '0.95rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = 
                                                        bestPrice === 'flipkart' 
                                                            ? 'rgba(3, 218, 198, 0.3)' 
                                                            : '#333';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLElement).style.background = 
                                                        bestPrice === 'flipkart' 
                                                            ? 'rgba(3, 218, 198, 0.2)' 
                                                            : '#2a2f38';
                                                }}
                                            >
                                                <div style={{ fontWeight: 'bold' }}>
                                                    ${flipkartPrice.toFixed(2)}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'inherit', opacity: 0.8 }}>
                                                    Flipkart {bestPrice === 'flipkart' ? '✓ Best Price' : ''}
                                                </div>
                                            </a>
                                        </div>

                                        {savings > 0 && (
                                            <div style={{
                                                background: 'rgba(76, 175, 80, 0.15)',
                                                border: '1px solid #4caf50',
                                                borderRadius: '6px',
                                                padding: '8px 12px',
                                                textAlign: 'center',
                                                color: '#4caf50',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                            }}>
                                                You save ${savings.toFixed(2)} by choosing {bestPrice === 'amazon' ? 'Amazon' : 'Flipkart'}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comparison;