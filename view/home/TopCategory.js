import React from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-right.svg";
import PageBuilder from "../../components/category-card/PageBuilder";
import EcomCat from "../../components/category-card/EcomCat";
const TopCategory = (data) => {
  return (
    <>
      <section className="top-list sec-pd">
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Top Categories</h1>
                <Link href={`/categories`}>
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row row-content">
            {data?.topListCategory?.map((category) => {
              return (
                <div className="col-lg-3 col-md-4">
                  <PageBuilder category={category} />
                </div>
              );
            })}

            {/* <div className="col-lg-3 col-md-4">
            <EcomCat/>
            </div> */}
            {/* <div className="col-lg-3 col-md-4">
            <PageBuilder/>
            </div>
            <div className="col-lg-3 col-md-4">
            <EcomCat/>
            </div>
            <div className="col-lg-3 col-md-4">
            <PageBuilder/>
            </div>
            <div className="col-lg-3 col-md-4">
            <EcomCat/>
            </div>
            <div className="col-lg-3 col-md-4">
            <PageBuilder/>
            </div>
            <div className="col-lg-3 col-md-4">
            <EcomCat/>
            </div> */}
          </div>
          <div className="row row-content">
            <div className="col-lg-12">
              <div className="flex-heading mob-flex-btn">
                <Link href="/categories">
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
    </>
  );
};

export default TopCategory;
