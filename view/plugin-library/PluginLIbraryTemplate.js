import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import JiraCard from "../../components/plugin-card/JiraCard";
import cookie from "js-cookie";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const FavlistTemplate = (search) => {
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [pluginData, setAllPluginData] = useState();
  const [sortBy, setSortBy] = useState("a_to_z");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, totalPageCount] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [wpsFavs, setWpFavs] = useState();
  const [wpListShow, setWpListShow] = useState(false);
  const [pageLimit, setPageLimit] = useState();
  const [onSearch, setOnsearch] = useState("");
  const [run, setRun] = useState(0);

  const getAllPlugins = async () => {
    try {
      setRun(1);
      let url;
      if (onSearch?.length > 0) {
        setSearchKeyWord("");
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/plugins?page=${currentPage}&sortby=${sortBy}&search=${onSearch}`;
      } else if (searchKeyWord?.length > 0) {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/plugins?page=${currentPage}&sortby=${sortBy}&search=${searchKeyWord}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/plugins?page=${currentPage}&sortby=${sortBy}`;
      }

      setLoaderState(true);
      const allPlugins = await axios.get(url);

      setAllPluginData(allPlugins?.data?.data);
      totalPageCount(allPlugins?.data?.page_count);
      setPageLimit(allPlugins?.data?.per_page_limit);

      setLoaderState(false);
    } catch (err) {
      console.log(err);
      setLoaderState(false);

      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (run) {
      setSearchKeyWord("");
      getAllPlugins();
    }
  }, [run, currentPage, sortBy]);

  useEffect(() => {
    if (search?.search) {
    } else {
      getAllPlugins();
    }
  }, [currentPage, sortBy]);

  const getAllWpFavs = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token) {
        let pluginStore = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown-wpfavs-list`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );

        setWpFavs(pluginStore?.data?.data);
        setWpListShow(true);
      } else {
        setWpListShow(false);
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        setWpListShow(false);
      } else {
        setWpListShow(false);
      }
      console.log("error", err);
    }
  };
  useEffect(() => {
    setSearchKeyWord(search?.search);
  }, [search]);
  useEffect(() => {
    getAllWpFavs();
  }, []);

  useEffect(() => {
    if (searchKeyWord?.length > 0) {
      getAllPlugins();
    }
  }, [search, searchKeyWord]);

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
                <h1 className="mb-0">Plugins</h1>
                <div className="list-search-flex">
                  <form className="form-inline hero-form list-seach-form">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search plugin..."
                      onChange={(e) => {
                        setOnsearch(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary search-btn"
                      type="button"
                      onClick={() => {
                        setCurrentPage(1);
                        getAllPlugins();
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
                      <option value="newest">sort by New</option>
                    </select>
                    <span className="date-icon">
                      <Image alt="" src={ChevronDown} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {pluginData?.map((plugin) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <JiraCard
                    pluginRelated={plugin}
                    wpListShow={wpListShow}
                    wpsFavs={wpsFavs}
                  />
                </div>
              );
            })}
          </div>
          {pluginData?.length === 0 && (
            <p className="notfound">No plugins found</p>
          )}
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
