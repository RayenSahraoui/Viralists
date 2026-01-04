"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";
import Link from "next/link";

const CaseStudy2 = () => {

    const chooseContent = [
        {subtitle:'MARKETING', title:'PPC Advertising', content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor.'},
        {subtitle:'MARKETING', title:'Digital  Marketing', content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor.'},
        {subtitle:'MARKETING', title:'Content Marketing', content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor.'},
      ]; 
      
          useEffect(() => {
              loadBackgroudImages();
          }, []);
      
    return (
        <section className="case-studies-section-2 fix section-padding bg-cover"  data-background="/assets/img/case-studies/bg.jpg" >
        <div className="container">
            <div className="section-title-area">
                <div className="section-title">
                    <div className="sub-title bg-color-3 wow fadeInUp">
                        <span>Case Studies</span>
                    </div>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                        Best Case studies
                    </h2>
                </div>
                <div className="client-items wow fadeInUp" data-wow-delay=".5s">
                    <div className="client-logo">
                    <Image src="/assets/img/hero/logo.png" alt="img" width={107} height={18}   />
                    </div>
                    <div className="client-img">
                    <Image src="/assets/img/hero/client.png" alt="img" width={126} height={42}   />
                        <div className="star-icon">
                            <div className="star">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>

                            </div>
                            <span>450+ reviews</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="case-studies-wrapper-2">
                {chooseContent.map((item, i) => (
                <div key={i} className="case-studies-items bor-top bor-bottom">
                    <div className="content">
                        <h3><Link href="/project/project-details">{item.title}</Link></h3>
                        <span>{item.subtitle}</span>
                        <p>
                        {item.content}
                        </p>
                    </div>
                    <div className="main-button">
                        <Link href="/project/project-details"> <span className="theme-btn">Get Started </span><span className="arrow-btn"><i className="bi bi-arrow-up-right"></i></span></Link>
                    </div>
                    
                </div>
                ))}
            </div>
        </div>
    </section>      
    );
};

export default CaseStudy2;