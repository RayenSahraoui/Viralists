import CaseStudy4 from '@/app/Components/CaseStudy/CaseStudy4';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Case studies"
            ></BreadCumb>       
            <CaseStudy4></CaseStudy4>        
    </div>
  );
};

export default page;