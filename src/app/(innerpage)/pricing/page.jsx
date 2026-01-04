import BreadCumb from '@/app/Components/Common/BreadCumb';
import Faq1 from '@/app/Components/Faq/Faq1';
import Pricng2 from '@/app/Components/Pricing/Pricng2';
import React from 'react';

const page = () => {
  return (
    <div>
        <BreadCumb
          bgimg="/assets/img/breadcrumb.jpg"
          Title="Pricing"
      ></BreadCumb>    
      <Pricng2></Pricng2>  
      <Faq1 addclass="faq-section section-padding pt-0"></Faq1>
    </div>
  );
};

export default page;