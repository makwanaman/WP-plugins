import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import CategoryTemplate from "./CategoryTemplate";
import EntryHeader from "./EntryHeader";

const index = ({ topCategory }) => {
  return (
    <>
      <div className="page-Header">
        <Header />
        <EntryHeader />
      </div>
      <CategoryTemplate topCategory={topCategory} />
      <Footer />
    </>
  );
};

export default index;
