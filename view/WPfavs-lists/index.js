import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EntryHeader from "./EntryHeader";
import FavlistTemplate from "./FavlistTemplate";

const index = () => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <FavlistTemplate />
      <Footer />
    </>
  );
};

export default index;
