
import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlogAltImg from "../../public/blog-alt-img.svg";
import BlueArrowRight from "../../public/blue-arrow-right.svg";
const BlogAltImage = () => {
  return (
    <>
      <div className="blog-card article-card-box">
        <div className="card article-card">
          <div className="article-card-top">
            <Image alt="" src={BlogAltImg} className="card-img-top" />
            <div className="card-body">
              <p className="f-14 text-fade-4 mb-2">Jan 9 | 12 min to read</p>
              <h4 className="card-title article-hd">
                How to Add Alt Text to Images: 9 Tips to Write Optimal Image Alt
                Text for SEO
              </h4>
            </div>
          </div>
          <div className="card-footer text-center">
            <Link href="/">
              <a className="text-white plugin-link cursor-pointer">
                Learn <Image alt="" src={BlueArrowRight} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogAltImage;