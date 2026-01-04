import BreadCumb from '@/app/Components/Common/BreadCumb';
import TeamDetails from '@/app/Components/TeamDetails/TeamDetails';
import React from 'react';

const page = () => {
  return (
    <div>
        <BreadCumb
          bgimg="/assets/img/breadcrumb.jpg"
          Title="Team Details"
      ></BreadCumb>    
      <TeamDetails></TeamDetails>  
    </div>
  );
};

export default page;