import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Podio from "./Podio";
import PluginInfoTabs from "./PluginInfoTabs";
import Screenshots from "./Screenshots";
import JiraCard from "../../components/plugin-card/JiraCard";
import PodioList from "./PodioList";
import PlugInfoBox from "./PlugInfoBox";
import Loader from "../../components/Loader";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
const PluginPageTemplate = (data) => {
  const [pluginState, setPluginState] = useState();
  const [pluginRelated, setPluginRelated] = useState();
  const [loaderState, setLoaderState] = useState(false);
  const [wpsFavs, setWpFavs] = useState();
  const [wpListShow, setWpListShow] = useState(false);
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  useEffect(() => {
    setPluginState(data?.pluginData?.pluginData?.data);
    setPluginRelated(data?.pluginData?.pluginData?.plugin_related);
  }, [data]);
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
      setWpListShow(false);
    }
  };

  useEffect(() => {
    getAllWpFavs();
  }, []);

  return (
    <>
      <section className="plug-page-section">
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
              <div className="blog-img text-center mb-2 pt-5">
                <img
                  alt={data?.slug}
                  src={`https://ps.w.org/${data?.slug}/assets/banner-772x250.png?rev=${randomNumber}`}
                />
              </div>
            </div>

            <div className="col-lg-12 pt-4">
              <Podio pluginState={pluginState} />
            </div>
          </div>
          <div className="row mob-flex gap-1rem">
            <div className="col-lg-8">
              <PluginInfoTabs pluginState={pluginState} />
            </div>
            <div className="col-lg-4">
              <PlugInfoBox pluginState={pluginState} />
            </div>
          </div>
        </div>
        <Screenshots pluginState={pluginState} />
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Alternative Plugins for Podio</h1>
              </div>
            </div>
          </div>
          <div className="row">
            {pluginRelated?.map((pluginrelate) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <JiraCard
                    pluginRelated={pluginrelate}
                    wpListShow={wpListShow}
                    wpsFavs={wpsFavs}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <PodioList />
      </section>
    </>
  );
};

export default PluginPageTemplate;
