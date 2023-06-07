import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import ArticleCard from "../../components/article-blogs/ArticleCard";
import Loader from "../../components/Loader";
import axios from "axios";
const BlogArticlesTemplate = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [blogArticles, setBlogArticles] = useState();
  const [sortBy, setSortBy] = useState("a_to_z");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, totalPageCount] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [pageLimit, setPageLimit] = useState();
  const getAllBlogList = async () => {
    try {
      setLoaderState(true);

      let blogList = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog?page=${currentPage}&sortby=${sortBy}&search=${searchKeyWord}`
      );

      setBlogArticles(blogList?.data?.posts);
      totalPageCount(blogList?.data?.page_count);
      setPageLimit(blogList?.data?.per_page_limit);

      setLoaderState(false);
    } catch (Err) {
      setLoaderState(false);

      toast.error("Something Went Wrong");
    }
  };
  console.log(blogArticles?.length, "length", "pageCount", pageCount);
  useEffect(() => {
    getAllBlogList();
  }, [sortBy, currentPage]);
  return (
    <>
      <section className="favlists-section pt-5 pb-5">
        {loaderState === true ? (
          <div className="loader-box">
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="flex-heading mb-5 mt-5">
                <h1 className="mb-0">Articles</h1>
                <div className="list-search-flex">
                  <form className="form-inline hero-form list-seach-form">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search article..."
                      onChange={(e) => {
                        setSearchKeyWord(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary search-btn"
                      type="button"
                      onClick={() => {
                        setCurrentPage(1);

                        getAllBlogList();
                      }}
                    >
                      <Image alt="" src={SearchIcon} />
                      <span className="search-txt">Search</span>
                    </button>
                  </form>
                  <div className="filter-input border-bg">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setSortBy(e.target.value);
                      }}
                      id="filter-selector"
                    >
                      <option value="a_to_z">sort by A-Z</option>
                      <option value="z_to_a">sort by Z-A</option>
                    </select>
                    <span className="date-icon">
                      <Image alt="" src={ChevronDown} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {blogArticles?.map((article) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <ArticleCard blog={article} />
                </div>
              );
            })}
          </div>
          {pageCount > pageLimit ? (
            <div className="row">
              <div className="col-lg-12">
                <PagePagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  show={pageLimit}
                  pageCount={pageCount}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};
export default BlogArticlesTemplate;
