import React from "react";
import Image from "next/image";
import ScreenShot1 from "../../public/screenshot-1.png";
import parse from "html-react-parser";
const ScreenShotsOne = (data) => {

  return (
    <>
      <div className="plugin-card-box">
        <div className="card border-bg seo-card ss-card">
          <img alt="" src={data?. pluginScreensort} />
          
        </div>
      </div>
    </>
  );
};

export default ScreenShotsOne;
