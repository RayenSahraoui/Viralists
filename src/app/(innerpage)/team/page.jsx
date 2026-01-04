import BreadCumb from '@/app/Components/Common/BreadCumb';
import Team3 from '@/app/Components/Team/Team3';
import React from 'react';

const page = () => {
  return (
    <div>
        <BreadCumb
          bgimg="/assets/img/breadcrumb.jpg"
          Title="Team"
      ></BreadCumb> 
      <Team3></Team3>     
    </div>
  );
};

export default page;