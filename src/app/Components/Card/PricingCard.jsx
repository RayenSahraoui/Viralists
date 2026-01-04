import Image from "next/image";
import Link from "next/link";

const PricingCard = ({addclass,title,price,month,FeatureList,btnurl,btnname}) => {
    return (
        <div className={addclass}>
        <div className="pricing-header">
            <div className="content">
                <h4>{title}</h4>
                <h2>{price} <sub>/ {month}</sub></h2>
            </div>
            <div className="icon">
                <Image src="/assets/img/cloud.png" alt="img" width={76} height={76}   />
            </div>
        </div>
        <ul className="price-list">
        {FeatureList?.map((item, index) => (
            <li key={index}>
                <span className="price-1"><i className="bi bi-check-lg"></i> {item}</span>
                <span className="icon"><i className="bi bi-question-circle"></i></span>
            </li>
            ))}
        </ul>
        <div className="price-button">
            <Link href={btnurl} className="theme-btn">{btnname} <i className="bi bi-arrow-right"></i></Link>
        </div>
    </div>
    );
};

export default PricingCard;