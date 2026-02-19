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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (err) {
                setError('Failed to connect to the Transparency Engine backend.');
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
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: Math.random() * 2,
                color: `rgba(168, 85, 247, ${Math.random() * 0.25})`,
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

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="landing-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="float-animation" style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)' }}>LOADING LIVE STORE TOTALS...</div>
            </div>
        );
    }

    return (
        <div className="landing-page">
            <canvas ref={canvasRef} id="particle-canvas" />

            <div className="content-wrapper">
                <nav className="navbar" style={{ padding: '24px 64px' }}>
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4L26 9V23L16 28L6 23V9L16 4Z" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs><linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                        </svg>
                        Transparency Center
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Find a product..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--card-border)',
                                color: 'white',
                                padding: '10px 16px',
                                borderRadius: '10px',
                                outline: 'none',
                                width: '240px'
                            }}
                        />
                        <button className="btn-premium" style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)' }} onClick={() => navigate('/')}>Exit Engine</button>
                    </div>
                </nav>

                <main className="comparison-container" style={{ paddingTop: '0' }}>
                    <header className="comparison-header" style={{ marginBottom: '64px', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '16px', display: 'block' }}>Real-Time Store Battle</span>
                        <h1 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2.5px', marginBottom: '16px' }}>
                            Amazon vs <span>Flipkart</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '20px', maxWidth: '600px' }}>
                            We've aggregated the top 10 electronics directly from the SQL backend to show you the current platform victor.
                        </p>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingBottom: '100px' }}>
                        {filteredProducts.map(product => {
                            const diff = Math.abs(product.amazonPrice - product.flipkartPrice);
                            const amazonIsBest = product.amazonPrice < product.flipkartPrice;
                            const flipkartIsBest = product.flipkartPrice < product.amazonPrice;

                            return (
                                <div key={product.id} className="feature-card" style={{ padding: '0', background: 'rgba(17, 24, 39, 0.4)', borderRadius: '40px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: '300px' }}>
                                        {/* Product Profile */}
                                        <div style={{ padding: '48px', borderRight: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
                                            <img src={product.imageUrl} alt="" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '32px', marginBottom: '32px' }} />
                                            <h3 style={{ fontSize: '28px', marginBottom: '16px', lineHeight: '1.2' }}>{product.name}</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                                                {product.specs.slice(0, 3).map((spec, i) => (
                                                    <span key={i} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>{spec}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Platform Battleground */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative' }}>
                                            {/* Amazon Half */}
                                            <a href={product.amazonUrl} target="_blank" rel="noreferrer" className="platform-half amazon" style={{ padding: '48px', textDecoration: 'none', borderRight: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', transition: 'all 0.4s' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                                    <div style={{ background: '#FF9900', padding: '10px 20px', borderRadius: '12px', color: 'black', fontWeight: '900', fontSize: '14px' }}>AMAZON</div>
                                                    {amazonIsBest && <div className="badge-best">✓ BEST PRICE</div>}
                                                </div>
                                                <div style={{ fontSize: '56px', fontWeight: '900', color: amazonIsBest ? 'white' : 'var(--text-muted)', opacity: amazonIsBest ? 1 : 0.4 }}>₹{product.amazonPrice.toLocaleString()}</div>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px' }}>Direct listing updated recently.</p>
                                                <div style={{ marginTop: 'auto', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>View at Amazon <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
                                            </a>

                                            {/* Flipkart Half */}
                                            <a href={product.flipkartUrl} target="_blank" rel="noreferrer" className="platform-half flipkart" style={{ padding: '48px', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'all 0.4s' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                                    <div style={{ background: '#2874F0', padding: '10px 20px', borderRadius: '12px', color: 'white', fontWeight: '900', fontSize: '14px' }}>FLIPKART</div>
                                                    {flipkartIsBest && <div className="badge-best">✓ BEST PRICE</div>}
                                                </div>
                                                <div style={{ fontSize: '56px', fontWeight: '900', color: flipkartIsBest ? 'white' : 'var(--text-muted)', opacity: flipkartIsBest ? 1 : 0.4 }}>₹{product.flipkartPrice.toLocaleString()}</div>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px' }}>Direct listing updated recently.</p>
                                                <div style={{ marginTop: 'auto', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>View at Flipkart <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></div>
                                            </a>

                                            {/* Savings Bridge */}
                                            {diff > 0 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '-32px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    background: 'linear-gradient(to right, #6366f1, #a855f7)',
                                                    padding: '16px 32px',
                                                    borderRadius: '20px',
                                                    fontWeight: '800',
                                                    color: 'white',
                                                    whiteSpace: 'nowrap',
                                                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                                                    zIndex: 10
                                                }}>
                                                    SAVING: ₹{diff.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            <style>{`
                .platform-half:hover {
                    background: rgba(255, 255, 255, 0.05) !important;
                }
                .platform-half.amazon:hover { border-bottom: 4px solid #FF9900; }
                .platform-half.flipkart:hover { border-bottom: 4px solid #2874F0; }
                .comparison-container span {
                    background: linear-gradient(to right, #818cf8, #c084fc);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .badge-best {
                    background: rgba(34, 197, 94, 0.15);
                    color: #22c55e;
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    padding: 6px 14px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 800;
                }
                @media (max-width: 1200px) {
                    .feature-card > div { grid-template-columns: 1fr !important; }
                    .platform-battleground { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default Comparison;