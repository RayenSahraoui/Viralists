"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

const HeroBanner2 = () => {

        useEffect(() => {
            loadBackgroudImages();
          }, []);

          const settings = {
            dots: false,
            infinite: true,
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 4000,        
            responsive: [
              {
                breakpoint: 1399,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: 3,
                }
              },{
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          };  

          const brandContent = [
            {img:'/assets/img/brand/01.png'},
            {img:'/assets/img/brand/02.png'},
            {img:'/assets/img/brand/03.png'},
            {img:'/assets/img/brand/04.png'},
          ];

          const heroContent = {
            bg:'/assets/img/hero/hero-bg-2.png',  
            subtitle:"go for advertising",
            title:' Innovative Solutions for a Digital World.',
            content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or  randomised',
            img:'/assets/img/hero/hero-image-2.png',    
            btnname:'EXPLORE MORE',             
            btnurl:'/about',             
          }

    return (
        <section className="hero-section hero-2" data-background={heroContent.bg}>
        <div className="trophy-shape">
        <Image src="/assets/img/hero/trophy-shape.png" alt="img" width={128} height={232}   />
        </div>
        <div className="left-shape">
        <Image src="/assets/img/hero/left-shape.png" alt="img" width={410} height={956}   />
        </div>
        <div className="right-shape">
        <Image src="/assets/img/hero/right-shape.png" alt="img" width={481} height={1068}   />
        </div>
        <div className="rocket-shape float-bob-y">
        <Image src="/assets/img/hero/rocket-2.png" alt="img" width={135} height={199}   />
        </div>
        <div className="container-fluid">
            <div className="row g-4 justify-content-between align-items-center">
                <div className="col-lg-6">
                    <div className="hero-content">
                        <h6 className="wow fadeInUp">{heroContent.subtitle}</h6>
                        <h1 className="wow fadeInUp" data-wow-delay=".3s">
                        {heroContent.title}
                        </h1>
                        <p className="wow fadeInUp" data-wow-delay=".5s">
                        {heroContent.content}
                        </p>
                        <div className="hero-button">
                            <div className="main-button wow fadeInUp" data-wow-delay=".3s">
                                <Link href={heroContent.btnurl}> <span className="theme-btn">{heroContent.btnname} </span><span className="arrow-btn"><i className="bi bi-arrow-up-right"></i></span></Link>
                            </div>
                            <Link href={heroContent.btnurl} className="link-btn wow fadeInUp" data-wow-delay=".5s">{heroContent.btnname}</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="hero-image">
                        <Image src={heroContent.img} alt="img" className="wow img-custom-anim-left" width={537} height={731}   />
                        <div className="bg-shape">
                        <Image src="/assets/img/hero/bg-shape-2.png" alt="img" width={608} height={566}   />
                        </div>
                        <div className="box-shape">
                        <Image src="/assets/img/hero/box-shape.png" alt="img" width={341} height={188}   />
                        </div>
                        <div className="gap-shape">
                        <Image src="/assets/img/hero/gap-box.png" alt="img" width={391} height={365}   />
                        </div>
                        <div className="cursor-shape">
                        <Image src="/assets/img/hero/cursor.png" alt="img" width={141} height={69}   />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="brand-wrapper-2">
            <h4 className="brand-title">1k + Brands Trust Us</h4>
            <div className="swiper brand-slider">
                <div className="swiper-wrapper cs_slider_gap_30">
                <Slider {...settings}>
                {brandContent.map((item, i) => (                       
                    <div key={i} className="swiper-slide">
                        <div className="brand-img center">
                        <Image src={item.img} alt="img" width={200} height={60}   />
                        </div>
                    </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    </section>
    );
};

export default HeroBanner2;