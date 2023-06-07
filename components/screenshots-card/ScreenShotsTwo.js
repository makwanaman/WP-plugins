import React from "react";
import Image from "next/image";
import ScreenShot2 from "../../public/screenshot-2.png";

const ScreenShotsTwo = () => {
  return (
    <>
      <div className="plugin-card-box">
        <div className="card border-bg seo-card ss-card">
          <Image alt="" src={ScreenShot2} />
        </div>
      </div>
    </>
  );
};

export default ScreenShotsTwo;
