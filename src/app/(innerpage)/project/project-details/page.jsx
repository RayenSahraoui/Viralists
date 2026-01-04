import CaseStudyDetails from '@/app/Components/CaseStudyDetails/CaseStudyDetails';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
  return (
    <div>
             <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="Case study Details"
            ></BreadCumb>  
            <CaseStudyDetails></CaseStudyDetails>        
    </div>
  );
};

export default page;