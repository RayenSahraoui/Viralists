import BreadCumb from '@/app/Components/Common/BreadCumb';
import Faq1 from '@/app/Components/Faq/Faq1';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Faq"
            ></BreadCumb>   
            <Faq1 addclass="faq-section section-padding"></Faq1>       
    </div>
  );
};

export default page;