import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "../../public/add-icon.svg";
import ArticleFullImg from "../../public/jira-full-icon.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
const ArticleFullWidth = () => {
  return (
    <>
      <div className="article-card-box">
        <div className="card article-card">
          <div className="article-card-top">
            <div className="row">
              <div className="col-lg-6">
                <Image alt="" src={ArticleFullImg} className="card-img-top" />
              </div>
              <div className="col-lg-6">
                <div className="card-body">
                  <p className="f-14 text-fade-4 mb-2">
                    Jan 9 | 12 min to read
                  </p>
                  <h4 className="card-title article-hd">
                    Secret WordPress On-Site SEO Plugins & Tools for 2022
                  </h4>
                  <p className="auth-name">
                    <span className="text-fade"> By</span>
                    <span className="primary-text">Shani Navarro </span>
                  </p>
                  <div className="card-text text-fade">
                    Sometimes customers are interested in buying stuff but at a
                    later date and they would like to have a future reference
                    for these products...
                  </div>
                </div>
                <div className="text-center pt-4">
                  <Link href="/">
                    <a className="text-white plugin-link full-art-link border-bg">
                      Read More <Image alt="" src={BlueArrowRight} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleFullWidth;
