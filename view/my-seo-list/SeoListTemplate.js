import React, { useState, useEffect } from "react";

import LubendaCard from "../../components/plugin-card/LubendaCard";
import cookie from "js-cookie";
import axios from "axios";
const SeoListTemplate = ({ headerSeoList }) => {
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
        <div className="container">
          <div className="flex-heading mb-5 mt-5">
            <h1 className="mb-0">Plugins on the list:</h1>
          </div>
          <div className="row">
            {headerSeoList?.plugins
              ?.concat(
                headerSeoList?.custom_plugins,
                headerSeoList?.envato_plugins
              )
              ?.map((relatedData) => {
                return (
                  <div className="col-lg-4 col-md-6">
                    <LubendaCard
                      wpsFavs={wpsFavs}
                      relatedData={relatedData}
                      wpListShow={wpListShow}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SeoListTemplate;
