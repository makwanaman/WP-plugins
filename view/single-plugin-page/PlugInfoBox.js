import React from "react";
import { getTimeDifference } from "../../commonFunction/commonFunction";
const PlugInfoBox = ({ pluginState }) => {
  return (
    <>
      <div>
        <div className="plugin-card-box podio-box">
          <div className="card border-bg seo-card">
            <div className="card-body">
              <div className="plug-info-box">
                <div className="plug-info-label">Version</div>
                <div className="plug-info-text text-fade">
                  {pluginState?.data?.version}
                </div>
              </div>
              <div className="plug-info-box">
                <div className="plug-info-label">Last Update</div>
                <div className="plug-info-text text-fade">
                  {getTimeDifference(pluginState?.data?.last_updated)}
                </div>
              </div>
              <div className="plug-info-box">
                <div className="plug-info-label">Download</div>
                <div className="plug-info-text text-fade">
                  {" "}
                  {pluginState?.data?.downloaded.toLocaleString()}+
                </div>
              </div>
              <div className="plug-info-box">
                <div className="plug-info-label">Tested up to:</div>
                <div className="plug-info-text text-fade">
                  {" "}
                  {pluginState?.data?.tested}
                </div>
              </div>
              <div className="plug-info-box">
                <div className="plug-info-label">Categories:</div>
                <div className="plug-info-text text-fade">
                  {" "}
                  <span className="cat-name primary-bg text-white">
                    Management
                  </span>
                </div>
              </div>
              {/* <p className="tagged-cat mb-0">
                <span className="cat-tag-name border-bg text-fade">#shop</span>
                <span className="cat-tag-name border-bg text-fade">
                  #checkout
                </span>
                <span className="cat-tag-name border-bg text-fade">
                  #Cashback
                </span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlugInfoBox;
