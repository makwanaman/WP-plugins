import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import SeoCard from "../../components/SeoCard";

import Image from "next/image";
import axios from "axios";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import Loader from "../../components/Loader";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const FavlistTemplate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKeyword, setSortkeyword] = useState("a_to_z");
  const [search, setSearch] = useState("");
  const [allFavs, setAllFavs] = useState();
  const [pageCount, setPageCount] = useState();
  const [pageLimit, setPageLimit] = useState();
  const [topList, setTopList] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const router = useRouter();
  const [stateChange, setStateChange] = useState(false);

  const getAllWpfavs = async () => {
    try {
      setLoaderState(true);

      let access_token = cookie.get("access_token");
      let user_id = cookie.get("user_id");

      if (access_token) {
        let allWpFavs = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs/${user_id}?search=${search}&page=${currentPage}&sortby=${sortKeyword}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setPageCount(allWpFavs?.data?.page_count);
        setAllFavs(allWpFavs?.data?.data);
        setPageLimit(allWpFavs?.data?.per_page_limit);

        setLoaderState(false);
      } else {
        setLoaderState(false);
        router.push("/signin");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const getTopList = async () => {
    try {
      setLoaderState(true);
      let access_token = cookie.get("access_token");
      if (access_token) {
        let allTopList = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-wpfavs`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setTopList(allTopList?.data?.data);
      }
      setLoaderState(false);
    } catch (err) {
      setLoaderState(false);
      if (err?.response?.data?.status === 401) {
        cookie.remove("access_token");
        setLoaderState(false);
        router.push("/signin");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllWpfavs();
  }, [currentPage, sortKeyword]);
  useEffect(() => {
    getTopList();
  }, [stateChange]);

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
          <div className="flex-heading mb-5 mt-5">
            <h1 className="mb-0">My Wpfavs Lists</h1>
          </div>
          <div className="row">
            {topList?.map((list) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <SeoCard
                    fav={list}
                    setStateChange={setStateChange}
                    deleteData={true}
                    stateChange={stateChange}
                  />
                </div>
              );
            })}
          </div>
          {topList?.length === 0 && <p className="notfound">No Wpfavs yet</p>}
          <div className="row">
            <div className="col-lg-12">
              <div className="flex-heading mb-5 mt-5">
                <h1 className="mb-0">Browse All</h1>
                <div className="list-search-flex">
                  <form className="form-inline hero-form list-seach-form">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search list..."
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary search-btn"
                      type="button"
                      onClick={getAllWpfavs}
                    >
                      <Image alt="" src={SearchIcon} />
                      <span className="search-txt">Search</span>
                    </button>
                  </form>
                  <div className="filter-input border-bg">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setSortkeyword(e.target.value);
                      }}
                      id="filter-selector"
                    >
                      <option value="a_to_z">sort by A-Z</option>
                      <option value="z_to_a">sort by Z-A</option>
                      <option value="like">sort by likes</option>
                    </select>
                    <span className="date-icon">
                      <Image alt="" src={ChevronDown} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {allFavs?.map((fav) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <SeoCard fav={fav} />
                </div>
              );
            })}
          </div>
          {allFavs?.length === 0 && <p className="notfound">No Wpfavs yet</p>}
          {pageCount > pageLimit ? (
            <div className="row">
              <div className="col-lg-12">
                <PagePagination
                  currentPage={currentPage}
                  show={pageLimit}
                  setCurrentPage={setCurrentPage}
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

export default FavlistTemplate;
