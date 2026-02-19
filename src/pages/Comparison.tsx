import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAmazonPrices } from '../services/amazonService';
import { fetchFlipkartPrices } from '../services/flipkartService';
import { Product } from '../types';
import '../styles/index.css';

const Comparison: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const amazonData = await fetchAmazonPrices();
                const flipkartData = await fetchFlipkartPrices();
                const combinedData = [...amazonData, ...flipkartData];
                setProducts(combinedData);
            } catch (err) {
                setError('Failed to fetch product transparency data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Subtle background animation (same as landing for consistency)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        const particles: any[] = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                size: Math.random() * 1.5,
                color: `rgba(99, 102, 241, ${Math.random() * 0.2})`,
            });
        }
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
            });
            requestAnimationFrame(animate);
        };
        animate();
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
            <div className="landing-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="float-animation" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>Aggregating Live Totals...</div>
            </div>
        );
    }

    return (
        <div className="landing-page">
            <canvas ref={canvasRef} id="particle-canvas" />

            <div className="content-wrapper">
                <nav className="navbar" style={{ padding: '24px 64px' }}>
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4L26 9V23L16 28L6 23V9L16 4Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <defs><linearGradient id="logo-grad"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
                        </svg>
                        Transparency Engine
                    </div>
                    <button className="btn-premium" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }} onClick={() => navigate('/')}>Return Home</button>
                </nav>

                <main className="comparison-container">
                    <header className="comparison-header">
                        <div>
                            <h1 style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-1.5px', marginBottom: '8px' }}>
                                Find the <span>Truth</span>
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Select indicators to reveal real-time store variances</p>
                        </div>
                        <div className="badge-saving">
                            ⚡ {selectedProductList.length} Selected
                        </div>
                    </header>

                    <div className="comparison-grid">
                        <aside className="selection-sidebar">
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '12px' }}>Market Listings</h3>
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className={`product-select-card ${selectedProducts.has(product.id) ? 'selected' : ''}`}
                                    onClick={() => toggleProductSelection(product.id)}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <img src={product.imageUrl} alt="" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                                        {selectedProducts.has(product.id) && (
                                            <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '700', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{product.amazonPrice < product.flipkartPrice ? 'Amazon' : 'Flipkart'} Best</div>
                                    </div>
                                </div>
                            ))}
                        </aside>

                        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {selectedProductList.length === 0 ? (
                                <div className="feature-card" style={{ padding: '80px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '48px', marginBottom: '24px' }}>🔎</div>
                                    <h2 style={{ marginBottom: '16px' }}>Ready to Compare?</h2>
                                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>Select products from the left to start the real-time transparency engine.</p>
                                </div>
                            ) : (
                                selectedProductList.map(product => {
                                    const bestPrice = product.amazonPrice < product.flipkartPrice ? 'Amazon' : 'Flipkart';
                                    const saving = Math.abs(product.amazonPrice - product.flipkartPrice);

                                    return (
                                        <div key={product.id} className="feature-card" style={{ padding: '0', overflow: 'hidden' }}>
                                            <div style={{ padding: '32px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '24px', alignItems: 'center' }}>
                                                <img src={product.imageUrl} alt="" style={{ width: '120px', height: '120px', borderRadius: '24px', objectFit: 'cover' }} />
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{product.name}</h3>
                                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                                        <span className="price-badge badge-best">{bestPrice} BEST</span>
                                                        {saving > 0 && <span className="price-badge" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)' }}>₹{saving} SAVING</span>}
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                        {product.specs.map((spec, i) => (
                                                            <span key={i} style={{
                                                                fontSize: '11px',
                                                                background: 'rgba(255,255,255,0.05)',
                                                                color: 'var(--text-muted)',
                                                                padding: '4px 8px',
                                                                borderRadius: '6px',
                                                                border: '1px solid var(--card-border)'
                                                            }}>
                                                                {spec}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(255,255,255,0.02)' }}>
                                                <a href={product.amazonUrl} target="_blank" rel="noreferrer" style={{ padding: '32px', textDecoration: 'none', borderRight: '1px solid var(--card-border)', transition: 'all 0.3s' }} className="store-link">
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Amazon Store</div>
                                                    <div style={{ fontSize: '28px', fontWeight: '900', color: product.amazonPrice <= product.flipkartPrice ? 'var(--text-main)' : 'var(--text-muted)' }}>₹{product.amazonPrice}</div>
                                                    <div style={{ fontSize: '12px', marginTop: '12px', color: 'var(--primary)' }}>Inspect Listing →</div>
                                                </a>
                                                <a href={product.flipkartUrl} target="_blank" rel="noreferrer" style={{ padding: '32px', textDecoration: 'none', transition: 'all 0.3s' }} className="store-link">
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Flipkart Store</div>
                                                    <div style={{ fontSize: '28px', fontWeight: '900', color: product.flipkartPrice <= product.amazonPrice ? 'var(--text-main)' : 'var(--text-muted)' }}>₹{product.flipkartPrice}</div>
                                                    <div style={{ fontSize: '12px', marginTop: '12px', color: 'var(--primary)' }}>Inspect Listing →</div>
                                                </a>
                                            </div>

                                            {saving > 0 && (
                                                <div style={{ padding: '24px', background: 'var(--primary)', color: 'white', textAlign: 'center', fontWeight: '700' }}>
                                                    Switching to {bestPrice} saves you ₹{saving} on this item
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </section>
                    </div>
                </main>
            </div>

            <style>{`
                .store-link:hover {
                    background: rgba(99, 102, 241, 0.05);
                }
                .comparison-container span {
                    background: linear-gradient(to right, #818cf8, #c084fc);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
};

export default Comparison;