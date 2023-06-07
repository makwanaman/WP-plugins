import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EntryHeader from "./EntryHeader";
import PageBuildersTemplate from "./PageBuildersTemplate";

const index = ({ singleCategory }) => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader singleCategory={singleCategory} />
      </div>
      <PageBuildersTemplate slug={singleCategory?.slug} />
      <Footer />
    </>
  );
};

export default index;
