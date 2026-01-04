'use client';
import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            icon: '🔍',
            title: 'Analyse Approfondie',
            description: 'Comprenez les enjeux durables dans le management des systèmes d\'information'
        },
        {
            icon: '💼',
            title: 'Stratégies Concrètes',
            description: 'Découvrez des approches pratiques et applicables à votre organisation'
        },
        {
            icon: '🌱',
            title: 'Approche Durable',
            description: 'Intégrez la dimension environnementale et sociale dans votre gestion IT'
        },
        {
            icon: '📊',
            title: 'Expertise Professionnelle',
            description: 'Guidé par des experts reconnus dans le domaine'
        }
    ];

    return (
        <section id="features" style={{
            padding: '150px 0',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
            position: 'relative'
        }}>
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col-lg-6 mx-auto">
                        <div style={{
                            width: '60px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #FFD700, transparent)',
                            margin: '0 auto 30px',
                            borderRadius: '2px'
                        }}></div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '300',
                            color: '#ffffff',
                            marginBottom: '30px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            Pourquoi Lire Ce Livre ?
                        </h2>
                        <p style={{
                            fontSize: '1rem',
                            color: '#999',
                            lineHeight: '1.8',
                            fontWeight: '300',
                            letterSpacing: '0.5px'
                        }}>
                            Un guide essentiel pour tous les professionnels qui souhaitent intégrer la durabilité dans leur management des systèmes d&apos;information.
                        </p>
                    </div>
                </div>
                <div style={{ marginBottom: '80px' }}></div>
                <div className="row">
                    {features.map((feature, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <div style={{
                                padding: '50px 35px',
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                borderRadius: '0',
                                height: '100%',
                                transition: 'all 0.4s ease',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = '#FFD700';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 215, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            >
                                {/* Hover effect gradient */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'left',
                                    transition: 'transform 0.4s ease'
                                }}></div>
                                
                                <div style={{
                                    fontSize: '3.5rem',
                                    marginBottom: '25px',
                                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    marginBottom: '15px',
                                    color: '#ffffff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    lineHeight: '1.7',
                                    color: '#999',
                                    fontWeight: '300'
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
