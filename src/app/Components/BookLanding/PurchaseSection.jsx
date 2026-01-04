'use client';
import React, { useState } from 'react';
import { trackOrderClick } from '../../../lib/trackClick';

const PurchaseSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profession: '',
        organisation: '',
        location: '',
        source: '',
        motivation: '',
        consent: false
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateStep = (step) => {
        const newErrors = {};
        
        if (step === 1) {
            if (!formData.firstName) {
                newErrors.firstName = 'Le prénom est obligatoire';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Le nom est obligatoire';
            }
            if (!formData.email) {
                newErrors.email = 'L\'adresse e-mail est obligatoire';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Veuillez entrer une adresse e-mail valide';
            }
        }
        
        if (step === 3) {
            // consent still required
            if (!formData.consent) {
                newErrors.consent = 'Vous devez accepter pour continuer';
            }

            // Validate source (must be one of Strapi's enum values)
            const allowedSources = [
                'Facebook', 'Instagram', 'Twitter/X', 'Email/Newsletter', 'Site web/Blog', 'Par un ami/collègue', 'Autre'
            ];
            if (!formData.source || !allowedSources.includes(formData.source)) {
                newErrors.source = 'Veuillez sélectionner comment vous avez entendu parler de nous';
            }
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            setErrors({});
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
        setErrors({});
    };

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            console.log('Form submitted (sending to /api/submit-client):', formData);

            // POST form data to internal route which forwards to Strapi
            const res = await fetch('/api/submit-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const txt = await res.text();
            let json;
            try { json = JSON.parse(txt); } catch (e) { json = txt; }

            if (!res.ok) {
                console.error('❌ [CLIENT] submit-client failed:', res.status, JSON.stringify(json, null, 2));
                setSubmitError({ status: res.status, body: json });
                setSubmitting(false);
                return;
            }

            console.log('✅ [CLIENT] submit-client success:', json);

            // Trigger tracking increment (non-blocking)
            (async () => {
                try {
                    const start = Date.now();
                    const t = await fetch('/api/track-click', { method: 'PUT', keepalive: true });
                    const duration = Date.now() - start;
                    if (!t.ok) {
                        const txt2 = await t.text();
                        console.error('❌ [CLIENT] trackOrder (form submit) failed:', t.status, txt2);
                    } else {
                        try {
                            const json2 = await t.json();
                            console.log('✅ [CLIENT] trackOrder (form submit) success:', json2, 'in', duration + 'ms');
                        } catch (e) {
                            console.log('✅ [CLIENT] trackOrder (form submit) success (no JSON) in', duration + 'ms');
                        }
                    }
                } catch (err) {
                    console.error('❌ [CLIENT] trackOrder (form submit) error:', err);
                }
            })();

            // On success, show the submitted UI
            setSubmitted(true);

            // Keep form data for 10 seconds (don't reset immediately)
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    profession: '',
                    organisation: '',
                    location: '',
                    source: '',
                    motivation: '',
                    consent: false
                });
                setSubmitted(false);
                setCurrentStep(1);
                setSubmitting(false);
            }, 10000);
        } catch (err) {
            console.error('❌ [CLIENT] submit-client error:', err);
            setSubmitError(err);
            setSubmitting(false);
        }
    };

    return (
        <section id="purchase" style={{
            padding: '150px 0',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative geometric shapes */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                border: '2px solid rgba(255, 215, 0, 0.2)',
                transform: 'rotate(45deg)',
                pointerEvents: 'none'
            }}></div>
            
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                width: '150px',
                height: '150px',
                border: '2px solid rgba(80, 16, 96, 0.3)',
                transform: 'rotate(45deg)',
                pointerEvents: 'none'
            }}></div>

            <div className="container">
                <div className="row justify-content-center align-items-start">
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <div className="book-cover-display" style={{
                            maxWidth: '400px',
                            margin: '0 auto',
                            position: 'relative',
                            transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
                            transition: 'all 0.5s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-10px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'perspective(1000px) rotateY(-8deg) rotateX(5deg) translateY(0)';
                        }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.15) 50%, transparent 70%)',
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
                    
                    <div className="col-lg-7">
                        <div style={{
                            padding: '60px 0'
                        }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: '300',
                                color: '#ffffff',
                                marginBottom: '25px',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                textAlign: 'center'
                            }}>
                                Commandez Votre Exemplaire
                            </h2>
                            
                            {/* Promo Code Hint */}
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '10px 20px',
                                    background: 'rgba(255, 215, 0, 0.1)',
                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                    borderRadius: '2px',
                                    color: '#FFD700',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}>
                                    🎁 Code Promo Révélé Après Soumission
                                </div>
                            </div>
                            
                            <p style={{
                                fontSize: '1rem',
                                color: '#cccccc',
                                marginBottom: '50px',
                                lineHeight: '1.8',
                                fontWeight: '300',
                                letterSpacing: '0.5px',
                                textAlign: 'center'
                            }}>
                                Rejoignez les professionnels qui font le choix d&apos;un management durable et responsable.
                            </p>

                            {!submitted ? (
                                <div>
                                    {/* Progress Indicator */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '40px',
                                        maxWidth: '400px',
                                        margin: '0 auto 40px'
                                    }}>
                                        {[1, 2, 3].map((step) => (
                                            <div key={step} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: currentStep >= step ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'rgba(255, 255, 255, 0.1)',
                                                    border: currentStep >= step ? '2px solid #FFD700' : '2px solid rgba(255, 255, 255, 0.3)',
                                                    color: currentStep >= step ? '#0a0a0a' : '#999',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: '700',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {step}
                                                </div>
                                                {step < 3 && (
                                                    <div style={{
                                                        flex: 1,
                                                        height: '2px',
                                                        background: currentStep > step ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
                                                        margin: '0 10px'
                                                    }}></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                                        
                                        {/* Step 1: Basic Info */}
                                        {currentStep === 1 && (
                                            <>
                                    {/* Prénom et Nom */}
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Prénom <span style={{ color: '#FFD700' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: errors.firstName ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                                                    border: errors.firstName ? '1px solid rgba(255, 0, 0, 0.5)' : '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = errors.firstName ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = errors.firstName ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="Prénom"
                                            />
                                            {errors.firstName && (
                                                <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '5px' }}>
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Nom <span style={{ color: '#FFD700' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: errors.lastName ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                                                    border: errors.lastName ? '1px solid rgba(255, 0, 0, 0.5)' : '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = errors.lastName ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = errors.lastName ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="Nom"
                                            />
                                            {errors.lastName && (
                                                <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '5px' }}>
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label style={{
                                            display: 'block',
                                            color: '#FFD700',
                                            fontSize: '0.85rem',
                                            marginBottom: '10px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontWeight: '600'
                                        }}>
                                            Adresse E-mail <span style={{ color: '#FFD700' }}>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '14px 20px',
                                                background: errors.email ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                                                border: errors.email ? '1px solid rgba(255, 0, 0, 0.5)' : '1px solid rgba(255, 215, 0, 0.3)',
                                                borderRadius: '2px',
                                                color: '#ffffff',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#FFD700';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = errors.email ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 215, 0, 0.3)';
                                                e.target.style.background = errors.email ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
                                            }}
                                            placeholder="votre@email.com"
                                        />
                                        {errors.email && (
                                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '5px' }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                            </>
                                        )}

                                        {/* Step 2: Professional Info */}
                                        {currentStep === 2 && (
                                            <>
                                    {/* Téléphone et Profession */}
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Numéro de Téléphone <span style={{ color: '#999', fontWeight: 'normal' }}>(Optionnel)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="+33 6 12 34 56 78"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Profession / Fonction
                                            </label>
                                            <input
                                                type="text"
                                                name="profession"
                                                value={formData.profession}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="Directeur, Manager, Étudiant..."
                                            />
                                        </div>
                                    </div>

                                    {/* Organisation et Localisation */}
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Organisation / Entreprise / École
                                            </label>
                                            <input
                                                type="text"
                                                name="organisation"
                                                value={formData.organisation}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="Nom de votre organisation"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label style={{
                                                display: 'block',
                                                color: '#FFD700',
                                                fontSize: '0.85rem',
                                                marginBottom: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                fontWeight: '600'
                                            }}>
                                                Pays / Ville
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                    borderRadius: '2px',
                                                    color: '#ffffff',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                }}
                                                placeholder="Ex: France, Paris"
                                            />
                                        </div>
                                    </div>
                                            </>
                                        )}

                                        {/* Step 3: Engagement */}
                                        {currentStep === 3 && (
                                            <>
                                    {/* Source */}
                                    <div className="mb-4">
                                        <label style={{
                                            display: 'block',
                                            color: '#FFD700',
                                            fontSize: '0.85rem',
                                            marginBottom: '10px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontWeight: '600'
                                        }}>
                                            Comment avez-vous entendu parler de nous ?
                                        </label>
                                        <select
                                            name="source"
                                            value={formData.source}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                padding: '14px 20px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                                borderRadius: '2px',
                                                color: '#ffffff',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#FFD700';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                            }}
                                        >
                                            <option value="" style={{ background: '#1a1a1a', color: '#ffffff' }}>
                                                Sélectionnez une option
                                            </option>
                                            <option value="Facebook" style={{ background: '#1a1a1a', color: '#ffffff' }}>Facebook</option>
                                            <option value="Instagram" style={{ background: '#1a1a1a', color: '#ffffff' }}>Instagram</option>
                                            <option value="Twitter/X" style={{ background: '#1a1a1a', color: '#ffffff' }}>Twitter/X</option>
                                            <option value="Email/Newsletter" style={{ background: '#1a1a1a', color: '#ffffff' }}>Email/Newsletter</option>
                                            <option value="Site web/Blog" style={{ background: '#1a1a1a', color: '#ffffff' }}>Site web/Blog</option>
                                            <option value="Par un ami/collègue" style={{ background: '#1a1a1a', color: '#ffffff' }}>Par un ami/collègue</option>
                                            <option value="Autre" style={{ background: '#1a1a1a', color: '#ffffff' }}>Autre</option>
                                        </select>
                                    </div>

                                    {/* Motivation */}
                                    <div className="mb-4">
                                        <label style={{
                                            display: 'block',
                                            color: '#FFD700',
                                            fontSize: '0.85rem',
                                            marginBottom: '10px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontWeight: '600'
                                        }}>
                                            Qu'est-ce qui vous motive à découvrir ce livre ?
                                        </label>
                                        <textarea
                                            name="motivation"
                                            value={formData.motivation}
                                            onChange={handleChange}
                                            rows="4"
                                            style={{
                                                width: '100%',
                                                padding: '14px 20px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                                borderRadius: '2px',
                                                color: '#ffffff',
                                                fontSize: '1rem',
                                                resize: 'vertical',
                                                transition: 'all 0.3s ease',
                                                fontFamily: 'inherit'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#FFD700';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                            }}
                                            placeholder="Décrivez votre motivation..."
                                        ></textarea>
                                    </div>

                                    {/* Consentement */}
                                    <div className="mb-4">
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '15px',
                                            color: errors.consent ? '#ff4444' : '#cccccc',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            padding: '15px',
                                            background: errors.consent ? 'rgba(255, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                                            border: errors.consent ? '1px solid rgba(255, 0, 0, 0.3)' : '1px solid rgba(255, 215, 0, 0.2)',
                                            borderRadius: '2px',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <input
                                                type="checkbox"
                                                name="consent"
                                                checked={formData.consent}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer',
                                                    marginTop: '2px',
                                                    accentColor: '#FFD700'
                                                }}
                                            />
                                            <span>
                                                J&apos;accepte de recevoir des communications liées à la durabilité des SI et à la revue <strong style={{ color: '#FFD700' }}>Management & DataScience</strong>. <span style={{ color: '#FFD700' }}>*</span>
                                            </span>
                                        </label>
                                        {errors.consent && (
                                            <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '5px', marginLeft: '35px' }}>
                                                {errors.consent}
                                            </p>
                                        )}
                                    </div>
                                            </>
                                        )}

                                    {/* Navigation Buttons */}
                                    <div style={{ 
                                        marginTop: '40px',
                                        display: 'flex',
                                        gap: '15px',
                                        justifyContent: 'space-between'
                                    }}>
                                        {currentStep > 1 && (
                                            <button 
                                                type="button"
                                                onClick={handlePrevious}
                                                style={{
                                                    flex: 1,
                                                    background: 'transparent',
                                                    color: '#cccccc',
                                                    padding: '18px',
                                                    borderRadius: '2px',
                                                    fontWeight: '600',
                                                    fontSize: '1rem',
                                                    border: '2px solid rgba(255, 215, 0, 0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.borderColor = '#FFD700';
                                                    e.target.style.color = '#FFD700';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                                                    e.target.style.color = '#cccccc';
                                                }}
                                            >
                                                ← Précédent
                                            </button>
                                        )}
                                        
                                        <button 
                                            type="submit"
                                            style={{
                                                flex: 1,
                                                background: 'linear-gradient(135deg, #501060 0%, #6a1d80 100%)',
                                                color: '#FFD700',
                                                padding: '18px',
                                                borderRadius: '2px',
                                                fontWeight: '700',
                                                fontSize: '1rem',
                                                border: '2px solid #FFD700',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-3px)';
                                                e.target.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.6)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        >
                                            {currentStep === totalSteps ? 'Envoyer la Demande →' : 'Suivant →'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '60px 40px',
                                    background: 'rgba(255, 215, 0, 0.05)',
                                    border: '2px solid rgba(255, 215, 0, 0.3)',
                                    borderRadius: '2px'
                                }}>
                                    <div style={{
                                        fontSize: '4rem',
                                        marginBottom: '20px'
                                    }}>✓</div>
                                    <h3 style={{
                                        color: '#FFD700',
                                        fontSize: '1.5rem',
                                        marginBottom: '15px',
                                        fontWeight: '600',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Merci pour votre intérêt !
                                    </h3>

                                    <div style={{
                                        marginBottom: '30px',
                                        padding: '20px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        borderRadius: '2px'
                                    }}>
                                        <p style={{
                                            color: '#cccccc',
                                            fontSize: '1rem',
                                            lineHeight: '1.7',
                                            marginBottom: '15px',
                                            fontWeight: '300'
                                        }}>
                                            Téléchargez votre extrait gratuit :
                                        </p>
                                        <a 
                                            href="#" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-block',
                                                color: '#FFD700',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                textDecoration: 'none',
                                                borderBottom: '2px solid #FFD700',
                                                paddingBottom: '2px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.color = '#FFA500';
                                                e.target.style.borderBottomColor = '#FFA500';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.color = '#FFD700';
                                                e.target.style.borderBottomColor = '#FFD700';
                                            }}
                                        >
                                            📥 Télécharger l'extrait →
                                        </a>
                                    </div>
                                    
                                    {/* Promo Code Display */}
                                    <div style={{
                                        padding: '20px',
                                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))',
                                        border: '2px solid rgba(255, 215, 0, 0.5)',
                                        borderRadius: '2px',
                                        marginBottom: '25px'
                                    }}>
                                        <p style={{
                                            color: '#FFD700',
                                            fontSize: '0.85rem',
                                            marginBottom: '10px',
                                            fontWeight: '600',
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase'
                                        }}>
                                            Votre Code Promo 20% Off
                                        </p>
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '15px 30px',
                                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                            borderRadius: '2px',
                                            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
                                            border: '2px solid rgba(255, 215, 0, 0.8)',
                                            fontFamily: 'monospace',
                                            fontSize: '1.3rem',
                                            fontWeight: '800',
                                            letterSpacing: '3px',
                                            color: '#0a0a0a'
                                        }}>
                                            COUPON-E7-20
                                        </div>
                                    </div>

                                    <p style={{
                                        color: '#cccccc',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.7',
                                        marginBottom: '25px'
                                    }}>
                                        Utilisez ce code pour bénéficier de 20% de réduction lors de votre commande.
                                    </p>
                                    
                                    <div style={{ marginTop: '30px' }}>
                                        <a 
                                            href="https://management-datascience.org/order-books/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-block',
                                                background: 'linear-gradient(135deg, #501060 0%, #6a1d80 100%)',
                                                color: '#FFD700',
                                                padding: '15px 40px',
                                                borderRadius: '2px',
                                                fontWeight: '700',
                                                fontSize: '0.95rem',
                                                border: '2px solid #FFD700',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                textDecoration: 'none'
                                            }}
                                            onClick={(e) => { 
                                                trackOrderClick(e);
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-3px)';
                                                e.target.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.6)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        >
                                            Commander Maintenant →
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PurchaseSection;
