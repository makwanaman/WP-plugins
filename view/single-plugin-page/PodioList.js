import React from "react";
import PodioCardOne from "../../components/podio-cards/PodioCardOne";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

const PodioList = () => {
  return (
    <>
      <section className="week-plugin-section sec-pd">
        <div className="container">
          <div className="row row-content pb-45">
            <div className="col-lg-12">
              <div className="flex-heading">
                <h1 className="mb-0">Discover the Lists with Podio</h1>
              </div>
            </div>
          </div>
          <div className="plugin-container">
            <ScrollContainer
              className="plugin-scroll podio-list-scroll"
              hideScrollbars={false}
            >
              <PodioCardOne />
              <PodioCardOne />
              <PodioCardOne />
              <PodioCardOne />
              <PodioCardOne />
              <PodioCardOne />
              <PodioCardOne />
            </ScrollContainer>
          </div>
        </div>
      </section>
    </>
  );
};

export default PodioList;
