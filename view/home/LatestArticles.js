import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowRight from "../../public/arrow-right.svg";
import ArticleCard from "../../components/article-blogs/ArticleCard";

import Slider from "react-slick";
const LatestArticles = ({ posts }) => {
  let postData = posts?.slice(0, 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="top-list sec-pd">
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Latest Articles</h1>
                <Link href="/blog-articles">
                  <a className="btn btn-primary discover-btn">
                    All Articles&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="row row-content">
            <div className="col-lg-4 col-md-6">
              <ArticleCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ArticleCard2 />
            </div>
            <div className="col-lg-4 col-md-6">
              <ArticleCard3 />
            </div>
          </div> */}
          <Slider {...settings} className="article-slider">
            {postData?.map((post) => {
              return (
                <div className="col-width pt-4">
                  <ArticleCard blog={post} />
                </div>
              );
            })}
          </Slider>
          <div className="row row-content mt-5">
            <div className="col-lg-12">
              <div className="flex-heading mob-flex-btn">
                <Link href="/blog-articles">
                  <a className="btn btn-primary discover-btn">
                    All Articles &nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
