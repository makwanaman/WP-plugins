import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JiraCard from "../../components/plugin-card/JiraCard";
import LubendaCard from "../../components/plugin-card/LubendaCard";
import ZeplinCard from "../../components/plugin-card/ZeplinCard";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const PageBuildersTemplate = ({ slug }) => {
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [pluginData, setAllPluginData] = useState();
  const [sortBy, setSortBy] = useState("a_to_z");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, totalPageCount] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const getAllPlugins = async () => {
    try {
      setLoaderState(true);
      let allPlugins = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/wpfavs-category-single/${slug}?page=${currentPage}&sortby=${sortBy}&search=${searchKeyWord}`
      );

      setAllPluginData(allPlugins?.data?.data);

      setLoaderState(false);
    } catch (err) {
      setLoaderState(false);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllPlugins();
  }, [sortBy, currentPage]);

  const [wpsFavs, setWpFavs] = useState();
  const [wpListShow, setWpListShow] = useState(false);
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
      }
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllWpFavs();
  }, []);
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
                        setSearchKeyWord(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary search-btn"
                      type="button"
                      onClick={getAllPlugins}
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
            {pluginData?.plugins?.map((plugin) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <ZeplinCard
                    plugin={plugin}
                    wpsFavs={wpsFavs}
                    wpListShow={wpListShow}
                  />
                </div>
              );
            })}

            {/* <div className="col-lg-4 col-md-6">
              <JiraCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ZeplinCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <JiraCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <LubendaCard />
            </div>
            <div className="col-lg-4 col-md-6">
              <ZeplinCard />
            </div> */}
          </div>
          {/* {pageCount > pageLimit ? ( */}

          <div className="row">
            <div className="col-lg-12">
              <PagePagination
                currentPage={currentPage}
                show={12}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
              />
            </div>
          </div>
          {/* ) : (
            ""
          )} */}
        </div>
      </section>
    </>
  );
};
export default PageBuildersTemplate;
