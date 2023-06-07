import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlueArrrowIcon from "../../public/blue-arrow-right.svg";
import PageBuildIcon1 from "../../public/page-buil-icon1.svg";
import PageBuildIcon2 from "../../public/page-buil-icon2.svg";
import PageBuildIcon3 from "../../public/page-buil-icon3.svg";
import Plus10Icon from "../../public/plus-10.svg";
const PageBuilder = ({ category }) => {
  return (
    <>
      <div className="catagory-card">
        <Link href={`/page-builders?slug=${category?.slug}`}>
          <a className="text-white">
            <div className="cat-card-header">
              <h5 className="mb-0 truncate-line-one">{category?.name}</h5>
              <Image alt="arrow" src={BlueArrrowIcon} />
            </div>
          </a>
        </Link>
        <div className="cat-icon-box">
          <span className="cat-img cursor-pointer">
            <Link href={`/page-builders?slug=${category?.slug}`}>
              <Image alt="" src={PageBuildIcon1} />
            </Link>
          </span>
          <span className="cat-img cursor-pointer">
            <Link href={`/page-builders?slug=${category?.slug}`}>
              <Image alt="" src={PageBuildIcon2} />
            </Link>
          </span>
          <span className="cat-img cursor-pointer">
            <Link href={`/page-builders?slug=${category?.slug}`}>
              <Image alt="" src={PageBuildIcon3} />
            </Link>
          </span>
          <span className="cat-img cursor-pointer">
            <Link href={`/page-builders?slug=${category?.slug}`}>
              <a className="text-white link">
                <Image alt="" src={Plus10Icon} />
              </a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default PageBuilder;
