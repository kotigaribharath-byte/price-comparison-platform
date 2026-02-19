import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}

import Lottie from 'lottie-react';
import discountAnimation from '../Discount.json';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: Particle[] = [];
        const particleCount = 150;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2,
                color: `rgba(${99 + Math.random() * 50}, ${102 + Math.random() * 50}, 241, ${Math.random() * 0.3})`,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="landing-page">
            <canvas ref={canvasRef} id="particle-canvas" />

            <div className="content-wrapper">
                <nav className="navbar">
                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4L26 9V23L16 28L6 23V9L16 4Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 12L21 14.5V17.5L16 20L11 17.5V14.5L16 12Z" fill="url(#logo-grad)" />
                            <defs>
                                <linearGradient id="logo-grad" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        PriceCompare
                    </div>
                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#pricing" className="nav-link">Pricing</a>
                    </div>
                    <button className="btn-premium btn-primary" onClick={() => navigate('/compare')}>Launch Platform</button>
                </nav>

                <main>
                    <section className="hero">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                The Future of<br />
                                <span>Price Intelligence</span>
                            </h1>
                            <p className="hero-description">
                                Experience real-time price tracking and cross-retailer comparison powered by advanced machine learning. Never settle for less than the best price.
                            </p>
                            <div className="hero-actions">
                                <button className="btn-premium btn-primary" onClick={() => navigate('/compare')}>Start Comparing</button>
                                <button className="btn-premium" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>View Demo</button>
                            </div>
                        </div>

                        <div className="hero-image">
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                <Lottie animationData={discountAnimation} loop={true} />
                            </div>
                        </div>
                    </section>

                    <section className="features" id="features">
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🔍</div>
                                <h3>Smart Discovery</h3>
                                <p>Instantly find products across thousands of stores with our high-speed indexing engine.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Live Tracking</h3>
                                <p>Receive millisecond-accurate price updates and instant notifications for price drops.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🛡️</div>
                                <h3>Verified Sellers</h3>
                                <p>We only track trusted retailers to ensure your shopping experience is safe and reliable.</p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-logo">PriceCompare</div>
                        <p className="copyright">&copy; 2025 PriceCompare Intelligence Systems. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
