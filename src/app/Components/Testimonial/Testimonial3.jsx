"use client"
import Image from "next/image";
import Slider from "react-slick";

const Testimonial3 = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,        
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 1,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };  

    const testimonialContent = [
        {img:'/assets/img/testimonial/05.png', subtitle:'Trader, USA', title:'Esther Howard', content:' Lorem ipsum dolor sit amet consectetur adipiscing elit. Mauris nullam the as integer quam dolor nunc semper.  faucibus pulvinar neque. The as Suscipit tristique mauris consectetur platea.'},
        {img:'/assets/img/testimonial/05.png', subtitle:'Trader, USA', title:'Esther Howard', content:' Lorem ipsum dolor sit amet consectetur adipiscing elit. Mauris nullam the as integer quam dolor nunc semper.  faucibus pulvinar neque. The as Suscipit tristique mauris consectetur platea.'},
      ]; 

    return (
        <section className="testimonial-section-3 section-padding pt-0">
            <div className="overlay-shape">
                <Image src="/assets/img/testimonial/overlay-shape.png" alt="img" width={370} height={946}   />
            </div>
            <div className="overlay-shape-2">
                <Image src="/assets/img/testimonial/overlay-shape-2.png" alt="img" width={488} height={1006}   />
            </div>
            <div className="left-shape">
            <Image src="/assets/img/testimonial/left-shape.png" alt="img" width={180} height={294}   />                
            </div>
            <div className="right-shape">
            <Image src="/assets/img/testimonial/right-shape.png" alt="img" width={79} height={94}   />               
            </div>
            <div className="container">
                <div className="testimonial-wrapper-3">
                    <div className="client-1">
                    <Image src="/assets/img/testimonial/06.png" alt="img" width={80} height={80}   />                       
                    </div>
                    <div className="client-2">
                    <Image src="/assets/img/testimonial/07.png" alt="img" width={62} height={62}   />                       
                    </div>
                    <div className="client-3">
                    <Image src="/assets/img/testimonial/08.png" alt="img" width={56} height={56}   />                       
                    </div>
                    <div className="client-4">
                    <Image src="/assets/img/testimonial/09.png" alt="img" width={80} height={80}   />                       
                    </div>
                    <div className="swiper testimonial-slider-2">
                        <div className="swiper-wrapper">
                            
                        <Slider {...settings}>
                        {testimonialContent.map((item, i) => (                            
                            <div key={i} className="swiper-slide">
                                <div className="testimonial-content">
                                    <div className="icon">
                                    <Image src="/assets/img/testimonial/quote.png" alt="img" width={60} height={60}   />
                                    </div>
                                    <p>
                                    {item.content}
                                    </p>
                                    <div className="client-info">
                                        <div className="client-img">
                                        <Image src={item.img} alt="img" width={50} height={50}   />                                          
                                        </div>
                                        <div className="content">
                                            <h6>{item.title}</h6>
                                            <span>{item.subtitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            </Slider>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial3;