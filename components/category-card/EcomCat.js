import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlueArrrowIcon from "../../public/blue-arrow-right.svg";
import PageBuildIcon1 from "../../public/page-buil-icon4.svg";
import PageBuildIcon2 from "../../public/page-buil-icon5.svg";
import PageBuildIcon3 from "../../public/page-buil-icon8.svg";
import Plus10Icon from "../../public/plus-10.svg";
const EcomCat = () => {
  return (
    <>
      <div className="catagory-card">
      <Link href="/">
          <a className="text-white">
        <div className="cat-card-header">
          <h5 className="mb-0">Ecommerce</h5>
          <Image alt="" src={BlueArrrowIcon} />
        </div>
        </a>
        </Link>
        <div className="cat-icon-box">
          <span className="cat-img">
            <Image alt="" src={PageBuildIcon1} />
          </span>
          <span className="cat-img">
            <Image alt="" src={PageBuildIcon2} />
          </span>
          <span className="cat-img">
            <Image alt="" src={PageBuildIcon3} />
          </span>
          <span className="cat-img">
            <Link href="/">
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

export default EcomCat;
