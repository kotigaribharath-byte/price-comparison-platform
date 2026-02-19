import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts } from '../services/apiService';
import { Product } from '../types';
import '../styles/index.css';

const Comparison: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Gaming', 'Cameras', 'Wearables'];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to connect to the Transparency Engine.');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

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
                color: `rgba(99, 102, 241, ${Math.random() * 0.15})`,
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

    const getCategory = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('iphone') || lowerName.includes('galaxy s')) return 'Smartphones';
        if (lowerName.includes('macbook') || lowerName.includes('dell xps')) return 'Laptops';
        if (lowerName.includes('headphones') || lowerName.includes('earbuds')) return 'Audio';
        if (lowerName.includes('playstation')) return 'Gaming';
        if (lowerName.includes('camera')) return 'Cameras';
        if (lowerName.includes('watch')) return 'Wearables';
        return 'Other';
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || getCategory(p.name) === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="landing-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="float-slow" style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)', letterSpacing: '4px' }}>SYNCING LIVE DATA...</div>
            </div>
        );
    }

    return (
        <div className="landing-page">
            <canvas ref={canvasRef} id="particle-canvas" />

            <div className="content-wrapper">
                <nav className="navbar" style={{ padding: '32px 64px' }}>
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
                            <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs><linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                        </svg>
                        Transparency Engine
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid var(--card-border)',
                                    color: 'white',
                                    padding: '12px 20px 12px 44px',
                                    borderRadius: '14px',
                                    outline: 'none',
                                    width: '300px',
                                    fontSize: '14px',
                                    backdropFilter: 'blur(10px)'
                                }}
                            />
                            <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <button className="btn-premium btn-primary" onClick={() => navigate('/')}>Dashboard Home</button>
                    </div>
                </nav>

                <div className="dashboard-grid">
                    {/* Sidebar Filters */}
                    <aside className="dashboard-sidebar">
                        <div className="feature-card" style={{ padding: '24px', background: 'var(--glass)', border: '1px solid var(--card-border)' }}>
                            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Market Categories</h4>
                            <div className="category-nav">
                                {categories.map(cat => (
                                    <div
                                        key={cat}
                                        className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="feature-card" style={{ padding: '24px', background: 'var(--glass)', border: '1px solid var(--card-border)' }}>
                            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Engine Status</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
                                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Live Cloud Sync</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px' }}>
                                Market <span style={{ color: 'var(--primary)' }}>Analysis</span>
                            </h2>
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>Showing {filteredProducts.length} results</span>
                        </div>

                        {filteredProducts.map(product => {
                            const diff = Math.abs(product.amazonPrice - product.flipkartPrice);
                            const amazonIsBest = product.amazonPrice <= product.flipkartPrice;
                            const flipkartIsBest = product.flipkartPrice < product.amazonPrice;

                            return (
                                <div key={product.id} className="product-dashboard-card">
                                    <div className="insight-panel">
                                        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '24px', overflow: 'hidden', borderRadius: '24px' }}>
                                            <img src={product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '800', color: 'white' }}>
                                                {getCategory(product.name).toUpperCase()}
                                            </div>
                                        </div>
                                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>{product.name}</h3>
                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>{product.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {product.specs.slice(0, 2).map((s, i) => (
                                                <span key={i} style={{ fontSize: '10px', fontWeight: '700', padding: '6px 10px', background: 'var(--glass)', borderRadius: '6px', border: '1px solid var(--card-border)', color: 'var(--text-dim)' }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="battleground-panel">
                                        {/* Amazon */}
                                        <a href={product.amazonUrl} target="_blank" rel="noreferrer" className="store-listing amazon">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                                <div className="trust-badge" style={{ background: 'rgba(255, 153, 0, 0.15)', color: '#FF9900' }}>Amazon</div>
                                                {amazonIsBest && <div className="trust-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>✓ Winner</div>}
                                            </div>
                                            <div className="price-display" style={{ color: amazonIsBest ? 'white' : 'var(--text-dim)' }}>₹{product.amazonPrice.toLocaleString()}</div>
                                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                                                Merchant Page <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </div>
                                        </a>

                                        {/* Flipkart */}
                                        <a href={product.flipkartUrl} target="_blank" rel="noreferrer" className="store-listing flipkart">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                                <div className="trust-badge" style={{ background: 'rgba(40, 116, 240, 0.15)', color: '#2874F0' }}>Flipkart</div>
                                                {flipkartIsBest && <div className="trust-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>✓ Winner</div>}
                                            </div>
                                            <div className="price-display" style={{ color: flipkartIsBest ? 'white' : 'var(--text-dim)' }}>₹{product.flipkartPrice.toLocaleString()}</div>
                                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                                                Merchant Page <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </div>
                                        </a>

                                        {/* Dynamic Savings Tag */}
                                        {diff > 0 && (
                                            <div className="savings-tag">
                                                SAVE ₹{diff.toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {filteredProducts.length === 0 && (
                            <div className="feature-card" style={{ padding: '80px', textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '24px' }}>🔍</div>
                                <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>No matches found</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query to find what you're looking for.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Comparison;