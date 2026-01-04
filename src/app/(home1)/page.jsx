import React from 'react';
import HeroSection from '../Components/BookLanding/HeroSection';
import FeaturesSection from '../Components/BookLanding/FeaturesSection';
import PurchaseSection from '../Components/BookLanding/PurchaseSection';

const page = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <PurchaseSection />
        </div>
    );
};

export default page;