'use client';
import React from 'react';

const BookFooter = () => {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            color: '#999',
            padding: '80px 0 50px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div style={{
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            marginBottom: '20px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            Management & DataScience
                        </div>
                        <p style={{
                            fontSize: '1rem',
                            marginBottom: '40px',
                            color: '#999',
                            fontWeight: '300',
                            letterSpacing: '1px'
                        }}>
                            Management durable des systèmes d&apos;information
                        </p>
                        <div style={{
                            borderTop: '1px solid rgba(255, 215, 0, 0.2)',
                            paddingTop: '30px',
                            fontSize: '0.85rem',
                            color: '#666',
                            letterSpacing: '0.5px'
                        }}>
                            © 2024 Management & DataScience. Tous droits réservés.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default BookFooter;

