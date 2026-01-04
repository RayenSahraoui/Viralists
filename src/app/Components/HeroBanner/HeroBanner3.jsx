"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import parse from 'html-react-parser';
import Link from "next/link";
import Image from "next/image";

const HeroBanner3 = () => {

        useEffect(() => {
            loadBackgroudImages();
        }, []);

        const heroContent = {
            bg:'/assets/img/hero/hero-bg-3.jpg',  
            subtitle:"go for advertising",
            title:' Achieve <span>Top Search </span> Rankings With Our <br/> SEO services',
            content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or  randomised',
            img:'/assets/img/hero/hero-image-3.png',     
            btnname:'EXPLORE MORE',             
            btnurl:'/about',             
          }

    return (
        <section className="hero-section hero-3" data-background={heroContent.bg}>
            <div className="line-shape">
            <Image src="/assets/img/hero/line-shape.png" alt="img" width={1342} height={124}   />
            </div>
            <div className="container-fluid">
                <div className="row g-4 justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-content">
                            <h6 className="wow fadeInUp">{heroContent.subtitle}</h6>
                            <h1 className="wow fadeInUp" data-wow-delay=".3s">
                               {parse(heroContent.title)}
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay=".5s">
                            {heroContent.content}
                            </p>
                            <div className="hero-button">
                                <div className="main-button wow fadeInUp" data-wow-delay=".3s">
                                    <Link href={heroContent.btnurl}> <span className="theme-btn">{heroContent.btnname} </span><span className="arrow-btn"><i className="bi bi-arrow-right"></i></span></Link>
                                </div>
                                <Link href={heroContent.btnurl} className="link-btn wow fadeInUp" data-wow-delay=".5s">{heroContent.btnname}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="hero-image wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
                        <Image src={heroContent.img} alt="img" width={576} height={520}   />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner3;