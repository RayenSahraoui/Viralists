'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackOrderClick } from '../../../lib/trackClick';

const BookHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '25px 0',
            transition: 'all 0.3s ease',
            boxShadow: isScrolled ? '0 0 20px rgba(255, 215, 0, 0.1)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(255, 215, 0, 0.2)' : 'none'
        }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '1.8rem',
                                fontWeight: '800',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                cursor: 'pointer'
                            }}>
                                MD
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-6 text-center d-none d-lg-block">
                        <nav style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <Link href="#hero" style={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease',
                                padding: '10px 20px',
                                borderRadius: '2px',
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#FFD700';
                                e.target.style.color = '#0a0a0a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#ffffff';
                            }}
                            >
                                Accueil
                            </Link>
                            <Link href="#features" style={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease',
                                padding: '10px 20px',
                                borderRadius: '2px',
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#FFD700';
                                e.target.style.color = '#0a0a0a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#ffffff';
                            }}
                            >
                                Pourquoi Lire ?
                            </Link>
                            <Link href="#purchase" style={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease',
                                padding: '10px 20px',
                                borderRadius: '2px',
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#FFD700';
                                e.target.style.color = '#0a0a0a';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#ffffff';
                            }}
                            >
                                Commander
                            </Link>
                        </nav>
                    </div>
                    <div className="col-lg-3 text-end">
                        <a 
                            href="https://management-datascience.org/order-books/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{
                                background: 'linear-gradient(135deg, #501060 0%, #6a1d80 100%)',
                                color: '#FFD700',
                                padding: '12px 35px',
                                borderRadius: '0',
                                fontWeight: '700',
                                textDecoration: 'none',
                                display: 'inline-block',
                                transition: 'all 0.3s ease',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                border: '2px solid #FFD700',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => { 
                                trackOrderClick(e);
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Acheter
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default BookHeader;

