import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SeoCard from "../../components/SeoCard";
import PageBuilderCard from "../../components/category-card/PageBuilder";
import EcomCatCard from "../../components/category-card/EcomCat";
import Link from "next/link";
import Image from "next/image";
import ChevronDown from "../../public/chevron-down-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import PagePagination from "../../components/PagePagination";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const CategoryTemplate = (data) => {
  const [startDate, setStartDate] = useState(new Date());
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [wpsFavs, setWpFavs] = useState();
  const [sortBy, setSortBy] = useState("a_to_z");

  const [loaderState, setLoaderState] = useState(false);
  const [allCategories, setAllCategories] = useState();

  const getAllCategories = async () => {
    try {
      setLoaderState(true);
      let allCategories = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories-list?sortby=${sortBy}&search=${searchKeyWord}`
      );
      setAllCategories(allCategories?.data?.data);

      setLoaderState(false);
    } catch (err) {
      setLoaderState(false);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [sortBy]);

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
            <h1 className="mb-0">Popular Categories</h1>
          </div>
          <div className="row">
            {data?.topCategory?.map((category) => {
              return (
                <div className="col-lg-3 col-md-6">
                  <PageBuilderCard category={category} />
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="flex-heading mb-5 mt-5">
                <h1 className="mb-0">Browse All</h1>
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
                      onClick={getAllCategories}
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
            {allCategories?.map((category) => {
              return (
                <div className="col-lg-3 col-md-6">
                  <PageBuilderCard category={category} />
                </div>
              );
            })}

            {/* <div className="col-lg-3 col-md-6">
              <EcomCatCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <PageBuilderCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <EcomCatCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <PageBuilderCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <EcomCatCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <PageBuilderCard />
            </div>
            <div className="col-lg-3 col-md-6">
              <EcomCatCard />
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col-lg-12">
              <PagePagination
                currentPage={currentPage}
                show={pageLimit}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
              />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CategoryTemplate;
