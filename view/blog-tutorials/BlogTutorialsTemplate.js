
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import BlogAutomated from "../../components/blog-tutorials-card/BlogAutomated";
import BlogAltImage from "../../components/blog-tutorials-card/BlogAltImage";
const BlogTutorialsTemplate = () => {
  return (
    <>
      <section className="favlists-section pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="flex-heading mb-5 mt-5">
                <h1 className="mb-0">Tutorials</h1>
                <div className="list-search-flex">
                  <form className="form-inline hero-form list-seach-form">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search article..."
                    />
                    <button
                      className="btn btn-primary search-btn"
                      type="submit"
                    >
                      <Image alt="" src={SearchIcon} />
                      <span className="search-txt">Search</span>
                    </button>
                  </form>
                  <div className="filter-input border-bg">
                    <select className="form-control" id="filter-selector">
                      <option>sort by date</option>
                      <option>sort by rating</option>
                      <option>sort by A-Z</option>
                      <option>sort by Z-A</option>
                      <option>sort by Installs</option>
                    </select>
                    <span className="date-icon">
                      <Image alt="" src={ChevronDown} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAutomated />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAltImage />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAutomated />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAltImage />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAutomated />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAltImage />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAutomated />
            </div>
            <div className="col-lg-6 col-md-12">
              <BlogAltImage />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <PagePagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogTutorialsTemplate;
