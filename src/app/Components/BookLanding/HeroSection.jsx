'use client';
import React from 'react';
import Link from 'next/link';
import { trackOrderClick } from '../../../lib/trackClick';

const HeroSection = () => {
    return (
        <section id="hero" className="hero-section" style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '200px 0 150px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(80, 16, 96, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 4s ease-in-out infinite',
                pointerEvents: 'none'
            }}></div>
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '15%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'pulse 3s ease-in-out infinite',
                pointerEvents: 'none'
            }}></div>

            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div style={{ padding: '40px 0', position: 'relative', zIndex: 1 }}>
                            {/* Promo Code Hint */}
                            <div style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                background: 'rgba(255, 215, 0, 0.1)',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                borderRadius: '2px',
                                marginBottom: '25px',
                                color: '#FFD700',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}>
                                🎁 Code Promo Disponible
                            </div>
                            
                            {/* Decorative accent line */}
                            <div style={{
                                width: '60px',
                                height: '4px',
                                background: 'linear-gradient(90deg, #FFD700, transparent)',
                                marginBottom: '30px',
                                borderRadius: '2px'
                            }}></div>
                            
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: '300',
                                lineHeight: '1.2',
                                marginBottom: '30px',
                                color: '#ffffff',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                Vers un management
                                <br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: '700'
                                }}>
                                    durable
                                </span>
                                <br />
                                des systèmes d&apos;information ?
                            </h1>
                            
                            <p style={{
                                fontSize: '1.1rem',
                                marginBottom: '30px',
                                fontWeight: '300',
                                color: '#cccccc',
                                letterSpacing: '0.5px',
                                lineHeight: '1.8'
                            }}>
                                Coordonné par Guillaume Biot-Paquerot, Amélie Clauzel
                            </p>
                            
                            <div style={{ fontSize: '1rem', marginBottom: '50px', color: '#999', lineHeight: '1.8' }}>
                                <p>
                                    Explorez les enjeux du management durable dans le monde numérique. Découvrez des stratégies concrètes pour transformer vos systèmes d&apos;information vers une approche durable et responsable.
                                </p>
                            </div>
                            
                            <div>
                                <a 
                                    href="https://management-datascience.org/order-books/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn" 
                                    style={{
                                        background: 'linear-gradient(135deg, #501060 0%, #6a1d80 100%)',
                                        color: '#FFD700',
                                        padding: '18px 50px',
                                        borderRadius: '0',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease',
                                        border: '2px solid #FFD700',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}
                                    onClick={(e) => { 
                                        trackOrderClick(e);
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    Acheter Maintenant →
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <div className="book-cover-container" style={{
                            maxWidth: '450px',
                            margin: '0 auto',
                            position: 'relative',
                            transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
                            transition: 'all 0.5s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(-8deg) rotateX(5deg) scale(1)';
                        }}
                        >
                            {/* Glitch effect overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)',
                                pointerEvents: 'none',
                                zIndex: 2,
                                borderRadius: '2px'
                            }}></div>
                            
                            <img 
                                src="/assets/img/book-cover.jpg" 
                                alt="Vers un management durable des systèmes d'information ?" 
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '2px',
                                    boxShadow: '0 0 60px rgba(255, 215, 0, 0.3), 0 0 120px rgba(80, 16, 96, 0.5)',
                                    display: 'block',
                                    filter: 'brightness(1.1)',
                                    border: '2px solid #FFD700'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
