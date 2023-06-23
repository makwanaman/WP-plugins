import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeroImg from "../../public/hero-img.svg";
import SearchIcon from "../../public/search-icon.svg";
import Devider from "../../components/Devider";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import axios from "axios";
const HeorSection = () => {
  let [searchData, setSearchData] = useState("");
  const [options, setOptions] = useState();

  const filterUser = async () => {
    try {
      let access_token = cookie.get("access_token");
      if (access_token) {
        if (searchData !== "") {
          let responseData = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/plugins/search?slug=${searchData}`,
            {
              headers: {
                Authorization: access_token,
              },
            }
          );

          setOptions(responseData?.data?.data);
        } else {
          setOptions([]);
        }
      } else {
        router.push("/signup");
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        router.push("/signin");
      } else {
        toast.error("something went wrong");
      }
      // toast.error("something went wrong");
    }
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
    if (e.target.value) {
      filterUser();
    }
  };
  const router = useRouter();

  useEffect(() => {
    if (!searchData) {
      setOptions([]);
    }
  }, [searchData]);
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row row-content">
            <div className="col-lg-6">
              <div className="hero-left ">
                <div>
                  <span className="wp-text primary-text">WP FAVS</span>
                </div>

                <div className="head-text">
                  <h1>
                    The <span className="primary-text">world largest </span>
                    directory of tools and resources
                  </h1>
                </div>
                <Devider />
                <p className="hero-text">
                  Sed ut perspiciatis unde omnis iste natus era amet voluptatem
                  accusantium doloremque laudantium, totam aperiam, eaque.
                </p>
                <form className="form-inline hero-form">
                  <input
                    className="form-control"
                    type="search"
                    value={searchData}
                    placeholder="Look for plugin for your website?"
                    onChange={handleSearch}
                  />
                  <button
                    className="btn btn-primary search-btn"
                    type="button"
                    onClick={() => {
                      router.push({
                        pathname: "/plugin-library",
                        query: { search: searchData },
                      });
                    }}
                  >
                    <Image alt="" src={SearchIcon} />
                    <span className="search-txt">Search</span>
                  </button>
                  <div className="dropDown-css">
                    {options?.map((option) => {
                      return (
                        <div
                          className="dropdown-row cursor-pointer p-2 "
                          onClick={(e) => {
                            setSearchData(option?.name);
                            setOptions();
                          }}
                        >
                          {option?.name}
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-right">
                <div className="hero-img">
                  <Image alt="" src={HeroImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeorSection;
