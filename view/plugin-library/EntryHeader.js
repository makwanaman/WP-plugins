import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import LinkFadeIcon from "../../public/link-fade-icon.svg";
import HeartFadeIcon from "../../public/heart-fade-icon.svg";
import CopyFadeIcon from "../../public/copy-fade-icon.svg";
const EntryHeader = () => {
  return (
    <>
      <div className="entry-header">
        <div className="container text-center border-top-fade entry-header-box">
          <div className="row">
            <div className="col-lg-1 "></div>
            <div className="col-lg-10 ">
              <div></div>
              <h1 className="f-50">
                <span className="after-heading">Plugin Library</span>
              </h1>
              <div className="f-20 text-fade">
                More Than 300 Collection & 1,000 Plugins
              </div>
            </div>
            <div className="col-lg-1 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntryHeader