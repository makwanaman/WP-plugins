import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-right.svg";
import SeoCard from "../../components/SeoCard";
import Loader from "../../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
const TopList = (data) => {
  return (
    <>
      {data?.errorMessage === false ? (
        <section className="top-list sec-pd">
          {/* {loaderState===true?
            <div className="loader-box">
              
    <Loader/>
      </div>:""} */}
          <div className="container">
            <div className="row row-content pb-45">
              <div className="col-lg-12">
                <div className="flex-heading">
                  <h1 className="mb-0">Top Lists</h1>
                  <Link href="/WPfavs-lists">
                    <a className="btn btn-primary discover-btn">
                      Discover All&nbsp;&nbsp;
                      <Image alt="" src={ArrowRight} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row row-content">
              {data?.topList?.map((list) => {
                return (
                  <div className="col-lg-4 col-md-6">
                    <SeoCard fav={list} />
                  </div>
                );
              })}
            </div>
            {data?.topList?.length === 0 && <p className="notfound">Data not found</p>}
            <div className="row row-content">
              <div className="col-lg-12">
                <div className="flex-heading mob-flex-btn">
                  <Link href="/WPfavs-lists">
                    <a className="btn btn-primary discover-btn">
                      Discover All&nbsp;&nbsp;
                      <Image alt="" src={ArrowRight} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default TopList;
