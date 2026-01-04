"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";

const SuccessStories = () => {

        useEffect(() => {
            loadBackgroudImages();
        }, []);

        
    return (
        <section className="audience-section fix section-padding bg-cover" data-background="/assets/img/audience-bg.jpg">
        <div className="container">
            <div className="audience-wrapper">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="audience-content">
                            <div className="section-title">
                                <div className="sub-title bg-color-3 wow fadeInUp">
                                    <span className="wow fadeInUp">Success Stories</span>
                                </div>
                                <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                                    Organic Audience Driven On Your Websites
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
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-regular fa-star"></i>
                                        </div>
                                        <span>450+ reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="audience-right">
                            <div className="audience-img wow fadeInUp" data-wow-delay=".3s">
                            <Image src="/assets/img/audience-img.jpg" alt="img" width={333} height={391}   />
                            </div>
                            <div className="counter-box-area">
                                <div className="counter-box wow fadeInUp" data-wow-delay=".5s">
                                    <h2>
                                        <span className="count">500</span>+
                                    </h2>
                                    <div className="content">
                                        <h4>Total Project</h4>
                                        <p>Lorem dolor amet consectetur adipiscing any more elit. </p>
                                    </div>
                                </div>
                                <div className="counter-box wow fadeInUp" data-wow-delay=".7s">
                                    <h2>
                                        <span className="count">300</span>M+
                                    </h2>
                                    <div className="content">
                                        <h4>Investment</h4>
                                        <p>Lorem dolor amet consectetur adipiscing any more elit. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default SuccessStories;