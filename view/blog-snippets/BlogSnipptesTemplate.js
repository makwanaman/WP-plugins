import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import BlogAutomated from "../../components/blog-tutorials-card/BlogAutomated";
import BlogAltImage from "../../components/blog-tutorials-card/BlogAltImage";
import BlogSnippetsCard from "../../components/blog-snippets/BlogSnippetsCard";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
const BlogSnipptesTemplate = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [sortBy, setSortBy] = useState("a_to_z");
  const [loaderState, setLoaderState] = useState(false);
  const [snippet, setSnippet] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [pageLimit, setPageLimit] = useState();

  const getAllBlogSnippets = async () => {
    try {
      setLoaderState(true);
      let snippet = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/snippet?sortby=${sortBy}&search=${searchKeyWord}&page=${currentPage}`
      );
      setSnippet(snippet?.data?.posts);
      setPageCount(snippet?.data?.page_count);
      setPageLimit(snippet?.data?.per_page_limit);
      setLoaderState(false);
    } catch (err) {
      setLoaderState(false);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllBlogSnippets();
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
                <h1 className="mb-0">Snippets</h1>
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
                        getAllBlogSnippets();
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
                      <option value="newest">sort by Newest</option>
                    </select>
                    <span className="date-icon">
                      <Image alt="" src={ChevronDown} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {snippet?.map((snippetData) => {
              return (
                <>
                  <div className="col-lg-6 col-md-12">
                    <BlogSnippetsCard snippetInfo={snippetData} />
                  </div>
                </>
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
export default BlogSnipptesTemplate;
