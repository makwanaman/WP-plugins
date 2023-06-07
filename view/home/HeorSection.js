import React, { useState } from "react";
import Image from "next/image";
import HeroImg from "../../public/hero-img.svg";
import SearchIcon from "../../public/search-icon.svg";
import Devider from "../../components/Devider";
import { useRouter } from "next/router";
const HeorSection = () => {
  let [searchData, setSearchData] = useState("");
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };
  const router = useRouter();
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
