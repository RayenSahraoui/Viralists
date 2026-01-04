import About2 from '@/app/Components/About/About2';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Counter3 from '@/app/Components/Counter/Counter3';
import Team2 from '@/app/Components/Team/Team2';
import Testimonial3 from '@/app/Components/Testimonial/Testimonial3';
import Value1 from '@/app/Components/Value/Value1';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                bgimg="/assets/img/breadcrumb.jpg"
                Title="about us"
            ></BreadCumb> 
            <About2 addclass="about-section-2 fix section-padding"></About2>    
            <Counter3></Counter3>
            <Value1></Value1>
            <Team2></Team2>
            <Testimonial3></Testimonial3>
    </div>
  );
};

export default page;