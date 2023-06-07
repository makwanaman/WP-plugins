import React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkIcon from "../../public/link-icon.svg";
import CopyIcon from "../../public/copy-icon.svg";
import Seo1 from "../../public/seo1.svg";
import Seo2 from "../../public/seo2.svg";
import Seo3 from "../../public/seo3.svg";
import Seo4 from "../../public/seo4.svg";
import Seo5 from "../../public/seo5.svg";
import Seo6 from "../../public/seo6.svg";

const PodioCardOne = () => {
  return (
    <>
      {/* <div className="article-card-box">
        <div className="card article-card">
          <div className="article-card-top">
            <Image alt="" src={Article1Img} className="card-img-top" />
            <div className="card-body">
              <p className="f-14 text-fade-4 mb-2">Jan 9 | 12 min to read</p>
              <h4 className="card-title article-hd">
                Secret WordPress On-Site SEO Plugins & Tools for 2022
              </h4>
              <p className="auth-name">
                <span className="text-fade"> By</span>{" "}
                <span className="primary-text">Shani Navarro </span>
              </p>
              <div className="card-text text-fade">
                Sometimes customers are interested in buying stuff but at a
                later date and they would like to have a future reference for
                these products...
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <Link href="/">
              <a className="text-white plugin-link">
                Read More <Image alt="" src={BlueArrowRight} />
              </a>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="plugin-card-box">
        <div className="card border-bg seo-card">
          <div className="card-body">
            <button className="no-css wishlist-icon cursor-pointer">
              <i className="fa fa-heart-o"></i>
            </button>
            <h4 className="card-title">My SEO list</h4>
            <p className="auth-name">
              <span className="text-fade"> By</span>
              <span className="primary-text">Shani Navarro </span>
            </p>
            <p className="card-text text-fade">
              Some quick example text to build on the card title and make up the
              bulk of the card&#39;s content.
            </p>
            <div className="card-icon-list">
              <span className="seo-icon">
                <Image alt="" src={Seo1} />
              </span>
              <span className="seo-icon">
                <Image alt="" src={Seo2} />
              </span>
              <span className="seo-icon">
                <Image alt="" src={Seo3} />
              </span>
              <span className="seo-icon">
                <Image alt="" src={Seo4} />
              </span>
              <span className="seo-icon">
                <Image alt="" src={Seo5} />
              </span>
              <span className="seo-icon">
                <Image alt="" src={Seo6} />
              </span>

              <span className="seo-icon seo-icon-link semi-bold">
                <Link href="/">
                  <a className="text-white link">+10</a>
                </Link>
              </span>
            </div>
            <div className="card-footer-link">
              <Link href="/">
                <a className="text-white link">
                  <Image alt="" src={LinkIcon} />
                  &nbsp;&nbsp; Get list
                </a>
              </Link>
              <button className="no-css text-white link">
                <Image alt="" src={CopyIcon} />
                &nbsp;&nbsp; Duplicate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PodioCardOne;
