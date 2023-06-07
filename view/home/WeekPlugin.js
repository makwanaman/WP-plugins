import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-right.svg";
import PluginCard from "../../components/PluginCard";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import parse from "html-react-parser";
import axios from "axios";
import cookie from "js-cookie";
const WeekPlugin = (data) => {
  console.log("data", data);
  const [wpsFavs, setWpFavs] = useState();

  const [loginState, setLoginState] = useState(false);
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
        data?.setWpListShow(true);
      } else {
        data?.setWpListShow(false);
      }
    } catch (err) {
      if (err?.response?.data?.status === 401) {
        data?.setWpListShow(false);
        setLoginState(true);
      }
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllWpFavs();
  }, []);
  return (
    <>
      <section className="week-plugin-section sec-pd">
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Top Week&#39;s Plugins</h1>
                <Link href="/plugin-library">
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="plugin-container">
            {/* <ScrollContainer className="plugin-scroll" hideScrollbars={false}> */}
              <div className="plugin-scroll">
                {data?.pluginList?.map((list) => {
                  console.log("list", list);
                  return (
                    <PluginCard
                      list={list}
                      wpListShow={data?.wpListShow}
                      wpsFavs={wpsFavs}
                      loginState={loginState}
                    />
                  );
                })}
              </div>
            {/* </ScrollContainer> */}
          </div>
          <div className="row row-content mt-4">
            <div className="col-lg-12">
              <div className="flex-heading mob-flex-btn">
                <Link href="/plugin-library">
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

export default WeekPlugin;
