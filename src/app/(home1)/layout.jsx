import React from 'react';
import BookHeader from '../Components/BookLanding/BookHeader';
import BookFooter from '../Components/BookLanding/BookFooter';

const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
            <BookHeader />
            {children}
            <BookFooter />
        </div>
    );
};

export default DefalultLayout;