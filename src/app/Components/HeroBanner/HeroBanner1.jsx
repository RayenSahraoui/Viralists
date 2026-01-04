"use client"
import { useEffect, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import VideoModal from "../VideoModal/VideoModal";
import Image from "next/image";

const HeroBanner1 = () => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);

      const [iframeSrc, setIframeSrc] = useState('about:blank');
	  const [toggle, setToggle] = useState(false);
	
	  const handelClick = () => {
		setIframeSrc("https://www.youtube.com/embed/rRid6GCJtgc");
		setToggle(!toggle);
	  };
	  const handelClose = () => {
		setIframeSrc('about:blank');
		setToggle(!toggle);
	  };

      const heroContent = {
        bg:'/assets/img/hero/hero-bg.jpg',  
        subtitle:"go for advertising",
        title:'think digital',
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or  randomised',
        content2:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.',
        img:'/assets/img/hero/hero-text.png',   
        reviewlogo:'/assets/img/hero/logo.png',   
        reviewimg:'/assets/img/hero/client.png',   
        review:'450+ reviews',             
      }

    return (
        <section className="hero-section fix hero-1 bg-cover" data-background={heroContent.bg} >
        <div className="mike-shape">
        <Image src="/assets/img/hero/mike-shape.png" alt="img" width={84} height={84}   />
        </div>
        <div className="arrow-shape">
        <Image src="/assets/img/hero/arrow-shape.png" alt="img" width={55} height={28}   />
        </div>
        <div className="arrow-shape-2">
        <Image src="/assets/img/hero/arrow-shape.png" alt="img" width={55} height={28}   />
        </div>
        <div className="energy-shape float-bob-y">
        <Image src="/assets/img/hero/energy-shape.png" alt="img" width={94} height={94}   />
        </div>
        <div className="rocket-shape">
        <Image src="/assets/img/hero/rocket.png" alt="img" className="float-bob-y" width={142} height={142}   />
        </div>
        <div className="container-fluid">
            <div className="hero-title wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
            <Image src={heroContent.img} alt="img" width={979} height={116}   />     
            </div>
            <div className="row g-4 align-items-center">
                <div className="col-xl-5 col-lg-6">
                    <div className="hero-content">
                        <span className="wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.2s">{heroContent.subtitle}</span>
                        <h1 className="wow img-custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.2s">{heroContent.title}</h1>
                        <p className="wow fadeInUp" data-wow-delay=".3s">
                        {heroContent.content}
                        </p>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="hero-image">
                    <Image src="/assets/img/hero/hero-image.png" alt="img" className="wow img-custom-anim-left" width={608} height={674}   />
                        <div className="bg-shape">
                        <Image src="/assets/img/hero/bg-shape.png" alt="img" width={998} height={1131}   />
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                    <div className="video-right">
                        <a onClick={handelClick} className="video-btn video-popup wow fadeInUp" data-wow-delay=".3s">
                        <i className="bi bi-play-fill"></i>
                        <Image src="/assets/img/hero/text-circle.png" alt="img" width={128} height={126}   />   
                        </a>
                        <p className="wow fadeInUp" data-wow-delay=".5s">
                        {heroContent.content2}
                        </p>
                        <div className="client-items wow fadeInUp" data-wow-delay=".7s">
                            <div className="client-logo">
                            <Image src={heroContent.reviewlogo} alt="img" width={107} height={18}   />
                            </div>
                            <div className="client-img">
                            <Image src={heroContent.reviewimg} alt="img" width={126} height={42}   />
                                <div className="star-icon">
                                    <div className="star">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                    </div>
                                    <span>{heroContent.review}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <VideoModal
            isTrue={toggle}
            iframeSrc={iframeSrc}
            handelClose={handelClose}        
        ></VideoModal>        
    </section>
    );
};

export default HeroBanner1;