import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "../../public/arrow-right.svg";
import PluginCard from "../../components/PluginCard";
import ScreenShotsOne from "../../components/screenshots-card/ScreenShotsOne";
import ScreenShotsTwo from "../../components/screenshots-card/ScreenShotsTwo";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import parse from "html-react-parser";
const Screenshots = ({ pluginState }) => {
  const [arrayScreenSort, setArrayScreenSort] = useState();

  useEffect(() => {
    if (pluginState?.screenshots) {
      const imagesArray = Object?.values(pluginState?.screenshots);

      setArrayScreenSort(imagesArray);
    }
  }, [pluginState]);
  return (
    <>
      <section className="week-plugin-section sec-pd">
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Screenshots</h1>
              </div>
            </div>
          </div>
          <div className="plugin-container">
            <div className="">
              <ScrollContainer
                className="plugin-scroll ss-scroll"
                hideScrollbars={false}
              >
                {arrayScreenSort?.map((screensort) => {
                  return <ScreenShotsOne pluginScreensort={screensort?.src} />;
                })}
              </ScrollContainer>
            </div>
          </div>
          {/* <div className="row row-content mt-4">
            <div className="col-lg-12">
              <div className="flex-heading mob-flex-btn">
                <Link href="/">
                  <a className="btn btn-primary discover-btn">
                    Discover All&nbsp;&nbsp;
                    <Image alt="" src={ArrowRight} />
                  </a>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Screenshots;
